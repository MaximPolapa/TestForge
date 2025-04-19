#!/bin/bash


sudo docker-compose down -v
sudo docker system prune -a -f
sudo docker-compose up --build

