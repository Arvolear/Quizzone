server {
    listen 8444 ssl;
	
	server_name quiz-service.dapp-craft.com www.quiz-service.dapp-craft.com;

    ssl_certificate /etc/letsencrypt/live/quiz-service.dapp-craft.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/quiz-service.dapp-craft.com/privkey.pem;

	location / {
	    proxy_pass http://localhost:8080;
    	proxy_http_version 1.1;
	    proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "upgrade";
		proxy_read_timeout 1800;
	}
}

server {
    listen 443 ssl;
	
	server_name quiz-service.dapp-craft.com www.quiz-service.dapp-craft.com;

	root /var/www/quiz-service.dapp-craft.com/html;
	index index.php index.html;
    
	ssl_certificate /etc/letsencrypt/live/quiz-service.dapp-craft.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/quiz-service.dapp-craft.com/privkey.pem;

	location / {
	    try_files $uri $uri.html $uri/ $uri.php$is_args$query_string;
	}

	location ~* \.(png|jpg)$ {
    	add_header Access-Control-Allow-Origin *;
	}

	location ~ \.php$ {
		if ($request_uri ~ ^/index\.php($|\?)) {  
			return 302 /;  
		}

		if ($request_uri ~ ^/([^?]*)\.php($|\?)) {  
			return 302 /$1$args;  
		}

		try_files $uri =404;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    	include snippets/fastcgi-php.conf;
	}
	
	location ~ /.well-known/acme-challenge/ {
		allow all;
		default_type "text/plain";
	}
}

server {
    listen 80;
	
	server_name quiz-service.dapp-craft.com www.quiz-service.dapp-craft.com;

	return 301 https://$host$request_uri;
}
