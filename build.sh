#!/bin/bash

# build code

docker-compose build
docker-compose up -d


# setting up master database

sleep 20

priv_stmt="GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%' IDENTIFIED BY 'replica'; FLUSH PRIVILEGES;"
docker exec mysql-master sh -c "export MYSQL_PWD=\"kore_kara_dou_ikireba_ii?\"; mysql -u root -e \"$priv_stmt\""


# setting up slave database

sleep 20

MS_STATUS=`docker exec mysql-master sh -c 'export MYSQL_PWD="kore_kara_dou_ikireba_ii?"; mysql -u root -e "SHOW MASTER STATUS"'`
CURRENT_LOG=`echo $MS_STATUS | awk '{print $6}'`
CURRENT_POS=`echo $MS_STATUS | awk '{print $7}'`

start_slave_stmt="CHANGE MASTER TO MASTER_HOST='mysql-master',MASTER_USER='replica',MASTER_PASSWORD='replica',MASTER_LOG_FILE='$CURRENT_LOG',MASTER_LOG_POS=$CURRENT_POS; START SLAVE;"
docker exec mysql-slave sh -c "export MYSQL_PWD=\"kore_kara_dou_ikireba_ii?\"; mysql -u root -e \"$start_slave_stmt\""
