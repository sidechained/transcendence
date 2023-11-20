FROM debian:bookworm
RUN apt update &&\
    apt install mkcert &&\
	mkcert -install &&\
	mkcert localhost 127.0.0.1
CMD ["tail", "-f", "/dev/null"]