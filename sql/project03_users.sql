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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `passwords` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `roles` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'quan102','$2b$10$mPmxVh4QR.ONr3v3XVTaSuZM1nsmnfzq6xZ7MolGnYdB4todOjVd2','trungkien@gmail.com','2021-12-31 17:00:00','user'),(16,'Gia Quân','$2b$10$ZmezZ7MCOm163Bh/epoNnOJE3PhPJG0VrlbkC3hGEocikF1EeSMzu','giaquan@gmail.com','2019-12-31 17:00:00','admin'),(18,'nvquy','$2b$10$nqckj2s0TWXqOeCI/hkJ9eg6PHPTLQkidJMPIT26.NVYfYePRekzG','nvquy@gmail.com','2019-12-31 17:00:00','user'),(19,'adeay','$2b$10$J.wcP1mg2a9RLpS748Wlk.yULJ/3stkl2Ogvdr7lYHu84bwTiEdH2','1212@gmail.com','2023-06-04 17:00:00','user'),(20,'belyy','$2b$10$nKVeVucubHtfEPuoC4qfk.4vq6IaNnwKtcK.W.mIP/4CzScytHyV.','bely123@gmail.com','2023-06-04 17:00:00','user'),(21,'cara','$2b$10$ABsOmvPAPZdYoxluubJqIeOtBFj8z1VAg0ms5JiXGEutPm4La.qJi','carai001@gmail.com','2023-06-04 17:00:00','user'),(22,'Gia Quân User','$2b$10$XHy.z2T5SPPmjH6psEOqnutlNPvQ1U.2Fmae460cpcKPFVUTZ3MhG','giaquan2@gmail.com','2023-06-06 17:00:00','user'),(23,'giaquan','$2b$10$btBWObibMdAkAv.xYCuE8.UUI7u99F0hzwr/lybMm0lwJF8q6wdFe','quan102@gmail.com','2023-06-07 17:00:00','user'),(24,'user01','$2b$10$xQILxPd3FlKpk0ce0fmyEOP1WT9yFEadUDbm9vpGS3G/2XJH2T98i','user1@gmail.com','2023-06-07 17:00:00','user'),(25,'Trần Phú','$2b$10$Y9N.6038kT.a3nA7B/psdOtuXx/rUvccFgh1OxcLZid3srPNkqb5G','anhphu@gmail.com','2023-06-07 17:00:00','user'),(26,'Bảo Đan','$2b$10$OwZkMZUwk8owBijBWaDMiO9mpMvgO4RSx3mQG5HhhtI9xLPBNrPH6','user2@gmail.com','2023-06-08 17:00:00','user'),(27,'Pater','$2b$10$gZWAGt1QClRCyl3.MZJ.yufuNnT0rUx7B8Uzm57BOUEBYxNTRndai','user3@gmail.com','2023-06-08 17:00:00','user'),(28,'Minh Hi','$2b$10$uqMkTza6ePTxDqp3.fDXTu6VINiVhHLsngX5B.fXZyx5N/oI8av2m','user4@gmail.com','2023-06-08 17:00:00','user'),(29,'Hải Con','$2b$10$4dLhc7UAp4J2PQWUNlAHe.CT1g86dbtk8WS.3YR5spssj8c0Qtxj2','user5@gmail.com','2023-06-08 17:00:00','user'),(30,'Mie','$2b$10$TP.Gels1z3VuM4oVICcOV.ht6MovKvaZM6t.OP83MwaVNR50y/AgG','mie@gmail.com','2023-06-08 17:00:00','user'),(31,'Quỳnh Anh','$2b$10$yp9txwzDMpZat0oTTP5kEOPBl0QB.r2mMI4pXKdoAeV49c9xBvRNq','quynhanh@gmail.com','2023-06-08 17:00:00','user'),(32,'perter','$2b$10$jfoQ9BrbRUniFGCLt0UQKuIbm1sl45ay9M02EAxT9mehR6fJ1iX/C','perter@gmail.com','2023-06-12 17:00:00','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
