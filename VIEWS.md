# Dashboard

 - `/`
  - statystyki dzisiejszych zamówień (zdalne, lokalne)
  - listę rezerwacji i eventów zaplanowanych na dzisiaj

# Logowanie

 - `/login`
  - pola na login i hasło
  - guzik do zalogowania (link do dashboardu)

# Widok dostępności stolików

- `/tables`
 - wybór daty i godziny
 - tabela z listą rezerwacji oraz wydarzeń
  - każda kolumna = 1 stolik,
  - każdy wiersz = 30 minut,
  - ma przypominać widok tygodnia w kalendarzu Google, gdzie w kolumnach zamiast dni są różne stoliki
  - po kliknięciu rezerwacji lub eventu przechodzimy na stronę szczegółów
- `/tables/booking/:id`
 - zawiera wszystkie informacje dotyczące rezerwacji
 - umożliwia edycję i zapisanie zmian
- `/tables/booking/new`
 - analogicznie do powyższego, bez początkowych informacji
- `/tables/events/:id`
 - analogicznie do powyższego, dla eventów
- `/tables/events/new`
 - analogicznie do powyższego, dla eventów, bez początkowych informacji

# Widkok kelnera

- `/waiter`
 - tabela
  - w wierszach - stoliki
  - w kolumnach - różne rodzaje informacji (status, czas od ostatniej aktywności)
  - w ostatniej kolumnie - dostępne akcje dla danego stolika
- `/waiter/order/new`
 - numer stolika (edytowalny)
 - menu produktów
 - opcje wybranego produktu
 - zamówienie (zamówione produkty z opcjami i ceną)
 - kwota zamówienia
- `/waiter/order/:id`
 - jak powyższa

# Widok kuchni

- `/kitchen`
 - wyświetla listę zamówien w kolejności ich złożenia
 - lisrta musia zawierać:
  - nr stolika (lub zamówienia zdalnego)
  - pełne informacje dot. zamówionych dań
- na liście musi być możliwość oznaczenia zamówienia jako zrealizowanego
 