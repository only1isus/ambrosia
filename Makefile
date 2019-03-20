deploy:
	yarn build
	rsync --chmod 0755 -avz --progress ./build/* pi@192.168.0.37:/var/www/greenthumbfarms.com/html
