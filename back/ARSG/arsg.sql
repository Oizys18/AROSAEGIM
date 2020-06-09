-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.4.13-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- arsg 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `arsg` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `arsg`;

-- 테이블 arsg.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `saegim_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `registered_datetime` datetime NOT NULL,
  `contents` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_comment_saegim` (`saegim_id`),
  KEY `FK_comment_users` (`user_id`),
  CONSTRAINT `FK_comment_saegim` FOREIGN KEY (`saegim_id`) REFERENCES `saegim` (`id`),
  CONSTRAINT `FK_comment_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- 테이블 데이터 arsg.comment:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT IGNORE INTO `comment` (`id`, `saegim_id`, `user_id`, `user_name`, `registered_datetime`, `contents`) VALUES
	(1, 1, 2, 'bbb', '2020-05-22 08:20:28', '첫댓글입니다'),
	(2, 1, 3, 'ccc', '2020-05-22 08:20:28', '두번째댓글입니다'),
	(3, 1, 4, 'ddd', '2020-05-22 08:20:28', '세번째댓글입니다');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 테이블 arsg.hashtag 구조 내보내기
CREATE TABLE IF NOT EXISTS `hashtag` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 테이블 데이터 arsg.hashtag:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT IGNORE INTO `hashtag` (`id`, `name`) VALUES
	(1, '추억'),
	(2, '행복');
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;

-- 테이블 arsg.hibernate_sequence 구조 내보내기
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 arsg.hibernate_sequence:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT IGNORE INTO `hibernate_sequence` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1, 1, 9223372036854775806, 1, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;

-- 테이블 arsg.likes 구조 내보내기
CREATE TABLE IF NOT EXISTS `likes` (
  `saegim_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`saegim_id`,`user_id`),
  KEY `FKa2lwa7bjrnbti5v12mga2et1y` (`user_id`),
  CONSTRAINT `FKa2lwa7bjrnbti5v12mga2et1y` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKki66j26m7vwdl3q3p1e10gj52` FOREIGN KEY (`saegim_id`) REFERENCES `saegim` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 arsg.likes:~6 rows (대략적) 내보내기
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT IGNORE INTO `likes` (`saegim_id`, `user_id`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 1),
	(2, 2),
	(3, 1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;

-- 테이블 arsg.saegim 구조 내보내기
CREATE TABLE IF NOT EXISTS `saegim` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `registered_datetime` datetime NOT NULL,
  `contents` mediumtext DEFAULT NULL,
  `latitude` double NOT NULL DEFAULT 0,
  `longitude` double NOT NULL DEFAULT 0,
  `w3w` mediumtext DEFAULT NULL,
  `image` mediumtext DEFAULT NULL,
  `record` mediumtext DEFAULT NULL,
  `secret` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_saegim_users` (`user_id`),
  CONSTRAINT `FK_saegim_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='새김';

-- 테이블 데이터 arsg.saegim:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `saegim` DISABLE KEYS */;
INSERT IGNORE INTO `saegim` (`id`, `user_id`, `user_name`, `registered_datetime`, `contents`, `latitude`, `longitude`, `w3w`, `image`, `record`, `secret`) VALUES
	(1, 1, 'AAA', '2020-05-15 01:24:24', 'aaa의 첫번째 강남역 글', 37.49796833739008, 127.02786311390238, '아무주소', '아무이미지', '아무녹음', 0),
	(2, 1, 'AAA', '2020-05-16 01:24:24', 'aaa의 두번째 역삼역 글', 37.50076569982326, 127.03701885128164, '아무주소', '아무이미지', '아무녹음', 0),
	(3, 2, 'BBB', '2020-05-17 01:24:24', 'bbb의 첫번째 신논현역 글', 37.50448779899687, 127.02479496968536, '아무주소', '아무이미지', '아무녹음', 0),
	(4, 1, 'AAA', '2020-05-17 01:24:24', 'aaa의 세번째 글', 4, 4, '아무주소', '아무이미지', '아무녹음', 0);
/*!40000 ALTER TABLE `saegim` ENABLE KEYS */;

-- 테이블 arsg.tagging 구조 내보내기
CREATE TABLE IF NOT EXISTS `tagging` (
  `saegim_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  KEY `FK_tagging_hashtag` (`tag_id`),
  KEY `saegim_id` (`saegim_id`) USING BTREE,
  CONSTRAINT `FK_tagging_hashtag` FOREIGN KEY (`tag_id`) REFERENCES `hashtag` (`id`),
  CONSTRAINT `FK_tagging_saegim` FOREIGN KEY (`saegim_id`) REFERENCES `saegim` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 테이블 데이터 arsg.tagging:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `tagging` DISABLE KEYS */;
/*!40000 ALTER TABLE `tagging` ENABLE KEYS */;

-- 테이블 arsg.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='사용자';

-- 테이블 데이터 arsg.users:~7 rows (대략적) 내보내기
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT IGNORE INTO `users` (`id`, `email`, `password`, `name`) VALUES
	(1, 'aaa@aaa.com', 'aaaa', 'AAA'),
	(2, 'bbb@bbb.com', 'bbbb', 'BBB'),
	(3, 'ccc@ccc.com', 'cccc', 'CCC'),
	(4, 'ddd@ddd.com', '1234', 'DDD'),
	(5, 'eee@eee.com', 'eeee', 'EEE'),
	(6, 'fff@fff.com', 'ffff', 'FFF'),
	(7, 'ggg@ggg.com', 'gggg', 'Test');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
