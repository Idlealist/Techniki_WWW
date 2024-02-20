# **Projekt zaliczeniowy 2**
<br>
<div style="text-align: right"><b>Wojciech Szymański</b></div>
<br>

## **Wstęp**
Strona zrealizowana jako drugi projekt zaliczeniowy z przedmiotu Techniki WWW.

----------
## **Opis**
Strona jest prostą aplikacją internetową pozwalającą na tworzenie, modyfikację oraz eksport plików markdown.

----------

## **Funkcjonalność**
* Tworzenie/Usuwanie/Zmiana danych konta
* Logowanie
* Tworzenie/Edytowanie/Eksportowanie do html/Usuwanie plików markdown
* Wyświetlanie wszystkich utworzonych plików

----------


## **Jak uruchomić?**


### **Baza danych**
Uruchomić serwer Mongoose, a następnie w projekcie stworzyć plik `.env`
o treści :
```
DATABASE_URL= *adres url bazy danych*
np. "mongodb://localhost/nazwa_bazy"
```

### **Aplikacja**
Wymagane środowisko 'node.js', należy zainstalować potrzebne zależności i uruchomić aplikację:
```
npm install
npm start
```