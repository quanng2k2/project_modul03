-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: project03
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `bookingId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `roomId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `guests` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`bookingId`),
  KEY `userId` (`userId`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`roomId`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (6,23,21,'2023-06-27','2023-06-30',2,24690000.00,'2023-06-07 17:00:00'),(7,23,20,'2023-06-11','2023-06-15',3,20000000.00,'2023-06-07 17:00:00'),(13,25,40,'2023-06-09','2023-06-10',2,23000000.00,'2023-06-07 17:00:00'),(14,25,25,'2023-08-17','2023-08-20',2,75000000.00,'2023-06-07 17:00:00'),(15,25,40,'2023-06-09','2023-06-10',2,23000000.00,'2023-06-07 17:00:00'),(17,26,19,'2023-06-09','2023-06-13',3,12000000.00,'2023-06-08 17:00:00'),(18,26,30,'2023-06-11','2023-06-13',2,21000000.00,'2023-06-08 17:00:00'),(19,26,37,'2023-06-30','2023-07-02',3,7000000.00,'2023-06-08 17:00:00'),(22,27,20,'2023-06-10','2023-06-23',3,65000000.00,'2023-06-08 17:00:00'),(23,27,39,'2023-11-06','2023-11-12',3,22200000.00,'2023-06-08 17:00:00'),(24,28,42,'2023-11-09','2023-11-12',6,39000000.00,'2023-06-08 17:00:00'),(25,28,22,'2023-07-08','2023-07-10',2,20000000.00,'2023-06-08 17:00:00'),(26,29,44,'2023-06-11','2023-06-22',4,41800000.00,'2023-06-08 17:00:00'),(27,29,34,'2023-10-11','2023-10-15',5,6000000.00,'2023-06-08 17:00:00'),(28,30,22,'2023-06-10','2023-06-13',2,30000000.00,'2023-06-08 17:00:00'),(29,30,40,'2023-07-09','2023-07-11',3,46000000.00,'2023-06-08 17:00:00'),(30,31,40,'2023-06-26','2023-06-29',2,69000000.00,'2023-06-08 17:00:00'),(36,24,30,'2023-06-30','2023-07-02',2,21000000.00,'2023-06-12 17:00:00');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13 17:18:40
