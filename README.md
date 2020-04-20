# Choo Choo O' Clock

## https://wedodge89.github.io/choo-choo/

Choo Choo O' Clock is a web application designed to experiement with Google's Firebase application, wherein users can track, and add to, a simulated train station timetable board. 

## How it Works
To start, the application connects to the pre-established Firebase database to pull any existing train data onto the page. If none is found, an empty table is printed instead. 

When the user submits a new train, it is added to the database. New values, like "Next Arrival Time" are calculated, and the table on the web page is refreshed. 