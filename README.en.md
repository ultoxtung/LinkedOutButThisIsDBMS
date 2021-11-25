# Project for Database Management System class (INT3202 5)
Originally project for Web Application Development class (INT3306 30), using cutting-edge database optimization technologies, this project has been evolved into project for Database Management System class (INT3202 5).

## Setup and run

### 1. Setup

Install `docker` and `docker-compose`.

Linux (Debian based):
```bash
apt install docker.io docker-compose
```
Linux (Arch based)
```
pacman -S docker
```
Windows:

Install `Docker Desktop` on `wsl` or `wsl2` by [instruction](https://docs.docker.com/docker-for-windows/install/).

### 2. Run

Clone project from github

```
git clone https://github.com/HKAB/summer-weeb-1920H_PTUDW
```

If this is your first time running this project, run `build.sh` file
```
./build.sh
```
~~(My WFH VM has eaten every single space in my Windows installation drive, so can someone write the batch script for me pls?)~~ ☆⌒(>。<)

From next time, just simply using `docker-compose up -d` to run the project.

## Using

The web page can be accessed at http://localhost/.


![sample.gif](sample.gif)

User can also access to other services:
- MySQL Master Server: `localhost:3307` (username and password `backend:backend`)
- MySQL Slave Server: `localhost:3308` (username and password `replica:replica`)
- Redis Cache Server: `localhost:6379`
- Consul Dashboard: http://localhost:8500/
- Prometheus + Grafana Dashboard: http://localhost:8002/ (default username and password: `admin:admin`)
- Admin UI: http://localhost/admin

## Sample data

Sample data can be found here: [Data-sample.sql](https://drive.google.com/file/d/1I3WYE6YC5bnQ2MvwNN2rMTv5WU2_apxo/view?usp=sharing)

Import sample data into MySQL Master Server at `localhost:3307`, database schema `backend` with username and password `backend:backend`. Data will be automatically inserted into Slave Server afterward.

Inside sample data is:
- 6 student account: `student1` - `student6`, password is the same as username.
- 3 company account: `company7` - `company9`, password is the same as username.
- Tags for `Skill`, `Location` and `University`.
- Admin account: `admin:admin` (Login at http://localhost/admin)
