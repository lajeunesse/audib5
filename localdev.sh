trap "exit" INT TERM ERR
trap "kill 0" EXIT

sass --watch src/scss:public/css &
npm run webpackdev &

up start