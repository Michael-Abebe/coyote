# Coyote

[![StyleCI](https://styleci.io/repos/30256872/shield)](https://styleci.io/repos/30256872)
[![Build Status](https://travis-ci.org/adam-boduch/coyote.svg?branch=master)](https://travis-ci.org/adam-boduch/coyote)

Coyote to nazwa systemu obslugujacego serwis 4programmers.net. Obecnie w obludze jest wersja 1.x ktora mamy nadzieje zastapic wersja 2.0 ktora jest w trakcie pisania i bedzie dostepna na githubie jako open source. 

Uwaga! To repozytorium zawiera wersje 2.0-dev ktora absolutnie nie jest wersja koncowa.

## Wymagania

* PHP >= 5.5
    * Moduł GD
    * Moduł mongo
* PostgreSQL >= 9.3
* MongoDB >= 2.7
* composer
* node.js
* npm
* git

### Zalecane

* Redis
* Beanstalkd

## Instalacja

* `apt-get install php5-gd`
* `apt-get install php5-mongo`
* `git clone https://github.com/adam-boduch/coyote.git .`
* `cp .env.default .env` (plik .env zawiera konfiguracje bazy danych PostgreSQL oraz MongoDB)
* `psql -c 'create database coyote;' -U postgres`
* `make install` (na produkcji) lub `make install-dev` (bez minifikacji JS oraz CSS)

### Problemy podczas instalacji
#### Class 'MongoClient' not found

Czy biblioteka mongo jest zainstalowana? Jeżeli tak to `service php5-fpm restart`


## Aktualizacja projektu

`make update` (na produkcji) lub `make update-dev` (na serwerze deweloperskim)

## Jak mozesz pomoc?

Zachecamy do aktywnego udzialu w rozwoju projektu. Zajrzyj na zakladke *Issues* i zobacz jakie zadanie mozesz zrealizowac. Realizujemy tylko te zadanie ktore jest zaakceptowane i przypisane do wersji 2.0.. 

1. Utworz fork repozytorium
2. Wprowadz zmiany
3. Dodaj pull request
