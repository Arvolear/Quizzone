package log;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

public class ElasticLogger
{
    private static ElasticLogger elasticLogger;

    private static final String URL = "https://api.dapp-craft.com/dcllog/_doc/";
    private static final String METHOD = "POST";

    private ElasticLogger()
    {
    }

    public static ElasticLogger getInstance()
    {
        if (elasticLogger == null)
        {
            elasticLogger = new ElasticLogger();
        }

        return elasticLogger;
    }

    synchronized public void log(String action, String message)
    {
        Thread logger = new Thread(() ->
        {
            try
            {
                URL url = new URL(URL);
                URLConnection con = url.openConnection();
                HttpURLConnection http = (HttpURLConnection) con;
                http.setRequestMethod(METHOD);
                http.setDoOutput(true);

                byte[] out = ("{\n" +
                        "\"action\"" + ": " + "\"" + action.trim() + "\"" +
                        ",\n" +
                        "\"quiz_results\"" + ": " + message.trim() +
                        ",\n" +
                        "\"time\"" + ": " + "\"" + Instant.now() + "\"" +
                        "\n}"
                ).getBytes(StandardCharsets.UTF_8);

                int length = out.length;

                http.setFixedLengthStreamingMode(length);
                http.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                http.connect();

                try (OutputStream os = http.getOutputStream())
                {
                    os.write(out);
                }

                http.disconnect();
            }
            catch (Exception ex)
            {
                ex.printStackTrace();
            }
        });

        logger.start();
    }
}
