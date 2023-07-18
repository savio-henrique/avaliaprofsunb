ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'bd';
-- projeto_bd.Estudantes definition

CREATE TABLE `Estudantes` (
  `pk_matricula` int NOT NULL,
  `str_email` varchar(100) NOT NULL,
  `str_nome` varchar(20) NOT NULL,
  `str_sobrenome` varchar(100) NOT NULL,
  `str_curso` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `str_senha` char(32) NOT NULL,
  `blob_foto` longblob NOT NULL,
  `bo_status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`pk_matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Departamentos definition

CREATE TABLE `Departamentos` (
  `pk_codigo` int NOT NULL,
  `str_nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pk_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Professores definition

CREATE TABLE `Professores` (
  `pk_matricula` int NOT NULL,
  `str_nome` varchar(20) NOT NULL,
  `str_sobrenome` varchar(100) NOT NULL,
  `blob_foto` longblob NOT NULL,
  `fk_departamento` int NOT NULL,
  `bo_status` tinyint(1) NOT NULL,
  PRIMARY KEY (`pk_matricula`),
  KEY `Professores_FK` (`fk_departamento`),
  CONSTRAINT `Professores_FK` FOREIGN KEY (`fk_departamento`) REFERENCES `Departamentos` (`pk_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Disciplinas definition

CREATE TABLE `Disciplinas` (
  `pk_codigo` char(7) NOT NULL,
  `fk_departamento` int NOT NULL,
  `str_nome` varchar(255) NOT NULL,
  `bo_status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`pk_codigo`),
  UNIQUE KEY `Disciplinas_UN` (`pk_codigo`,`str_nome`,`bo_status`),
  KEY `Disciplinas_FK` (`fk_departamento`),
  CONSTRAINT `Disciplinas_FK` FOREIGN KEY (`fk_departamento`) REFERENCES `Departamentos` (`pk_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Administradores definition

CREATE TABLE `Administradores` (
  `pk_id` int NOT NULL AUTO_INCREMENT,
  `fk_estudante` int NOT NULL,
  PRIMARY KEY (`pk_id`),
  UNIQUE KEY `Administradores_UN` (`fk_estudante`),
  CONSTRAINT `Administradores_FK` FOREIGN KEY (`fk_estudante`) REFERENCES `Estudantes` (`pk_matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Turmas definition

CREATE TABLE `Turmas` (
  `pk_id` int NOT NULL AUTO_INCREMENT,
  `un_codigo` int NOT NULL,
  `fk_disciplina` char(7) NOT NULL,
  `un_periodo` char(5) NOT NULL,
  `bo_status` tinyint(1) NOT NULL,
  PRIMARY KEY (`pk_id`),
  UNIQUE KEY `Turmas_UN` (`un_codigo`,`fk_disciplina`,`un_periodo`),
  KEY `Turmas_FK` (`fk_disciplina`),
  CONSTRAINT `Turmas_FK` FOREIGN KEY (`fk_disciplina`) REFERENCES `Disciplinas` (`pk_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Turma_Prof definition

CREATE TABLE `Turma_Prof` (
  `fk_turma` int NOT NULL,
  `fk_professor` int NOT NULL,
  `str_horario` varchar(10) NOT NULL,
  `str_local` varchar(255) NOT NULL,
  PRIMARY KEY (`fk_professor`,`fk_turma`),
  KEY `Turma_Prof_FK_Turma` (`fk_turma`),
  CONSTRAINT `Turma_Prof_FK_Prof` FOREIGN KEY (`fk_professor`) REFERENCES `Professores` (`pk_matricula`),
  CONSTRAINT `Turma_Prof_FK_Turma` FOREIGN KEY (`fk_turma`) REFERENCES `Turmas` (`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Avaliacoes definition

CREATE TABLE `Avaliacoes` (
  `pk_codigo` int NOT NULL AUTO_INCREMENT,
  `fk_estudante` int NOT NULL,
  `fk_professor` int NOT NULL,
  `txt_texto` longtext NOT NULL,
  `int_nota` int NOT NULL,
  `bo_status` tinyint(1) NOT NULL,
  PRIMARY KEY (`pk_codigo`),
  KEY `Avaliacoes_FK_PROF` (`fk_professor`),
  KEY `Avaliacoes_FK_EST` (`fk_estudante`),
  CONSTRAINT `Avaliacoes_FK_EST` FOREIGN KEY (`fk_estudante`) REFERENCES `Estudantes` (`pk_matricula`),
  CONSTRAINT `Avaliacoes_FK_PROF` FOREIGN KEY (`fk_professor`) REFERENCES `Professores` (`pk_matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Denuncias definition

CREATE TABLE `Denuncias` (
  `pk_codigo` int NOT NULL AUTO_INCREMENT,
  `fk_estudante` int NOT NULL,
  `fk_avaliacao` int NOT NULL,
  `bo_status` tinyint(1) NOT NULL,
  `fk_administrador` int DEFAULT NULL,
  PRIMARY KEY (`pk_codigo`),
  KEY `Denuncias_FK_Est` (`fk_estudante`),
  KEY `Denuncias_FK` (`fk_administrador`),
  KEY `Denuncias_FK_Aval` (`fk_avaliacao`),
  CONSTRAINT `Denuncias_FK` FOREIGN KEY (`fk_administrador`) REFERENCES `Administradores` (`pk_id`),
  CONSTRAINT `Denuncias_FK_Aval` FOREIGN KEY (`fk_avaliacao`) REFERENCES `Avaliacoes` (`pk_codigo`),
  CONSTRAINT `Denuncias_FK_Est` FOREIGN KEY (`fk_estudante`) REFERENCES `Estudantes` (`pk_matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- projeto_bd.Turma_Est definition

CREATE TABLE `Turma_Est` (
  `fk_estudante` int NOT NULL,
  `fk_turma` int NOT NULL,
  PRIMARY KEY (`fk_estudante`,`fk_turma`),
  KEY `Turma_Est_FK_Turma` (`fk_turma`),
  CONSTRAINT `Turma_Est_FK_Est` FOREIGN KEY (`fk_estudante`) REFERENCES `Estudantes` (`pk_matricula`),
  CONSTRAINT `Turma_Est_FK_Turma` FOREIGN KEY (`fk_turma`) REFERENCES `Turmas` (`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--import 

LOAD DATA INFILE '/var/lib/mysql-files/departamentos_2023-1.csv' 
INTO TABLE Departamentos 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE VIEW Prof_Depto AS
SELECT prof.str_nome AS prof_nome, prof.str_sobrenome AS prof_sobrenome, depto.str_nome AS depto_nome
FROM Professores AS prof, Departamento AS depto 
WHERE prof.fk_departamento = depto.pk_codigo;