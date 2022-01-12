create table IF NOT EXISTS tb_readers(
    id_reader serial PRIMARY KEY,
    name_reader varchar(250) UNIQUE NOT NULL,
    email varchar(250) UNIQUE NOT NULL,
    social_network_reader varchar(300) UNIQUE
);

create table IF NOT EXISTS tb_books(
    id_book serial PRIMARY KEY,
    name_book varchar(250) UNIQUE NOT NULL,
    name_author_book varchar(250) UNIQUE NOT NULL
);

create table IF NOT EXISTS tb_favorite_reader_book(
    id_favorite serial,
    id_reader serial,
    id_book serial,
    PRIMARY KEY (id_favorite, id_reader, id_book),

    FOREIGN KEY (id_reader)
        REFERENCES tb_readers (id_reader),
    FOREIGN KEY (id_book)
        REFERENCES tb_books (id_book)
);
