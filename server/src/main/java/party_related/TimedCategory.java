package party_related;

import java.util.Calendar;

public class TimedCategory extends RandomCategory
{
    private final String startTime;

    public TimedCategory(String category, String alias, String startTime)
    {
        super(category, alias);

        this.startTime = startTime;
    }

    public Calendar getStartTime()
    {
        String[] times = startTime.split("-");

        int year = Integer.parseInt(times[0]);
        int month = Integer.parseInt(times[1]) - 1;
        int day = Integer.parseInt(times[2]);
        int hour = Integer.parseInt(times[3]);
        int minute = Integer.parseInt(times[4]);
        int second = Integer.parseInt(times[5]);

        Calendar calendar = Calendar.getInstance();

        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DAY_OF_MONTH, day);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, second);

        return calendar;
    }
}
