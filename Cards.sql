-- Adminer 4.2.6-dev MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Cards`;
CREATE TABLE `Cards` (
  `ID` int(225) NOT NULL COMMENT 'ID',
  `NAME` int(50) NOT NULL COMMENT 'Name',
  `TIME` int(50) NOT NULL COMMENT 'Time',
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `Cards` (`ID`, `NAME`, `TIME`) VALUES
(0,	0,	'Time');

-- 2018-11-21 16:10:37
