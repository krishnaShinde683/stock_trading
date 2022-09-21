-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2022 at 01:26 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stock_trading`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountcategory`
--

CREATE TABLE `accountcategory` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accountcategory`
--

INSERT INTO `accountcategory` (`id`, `type`) VALUES
(1, 'Regular Demate Account'),
(2, 'Partner Broker Account');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobileNo` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `accountCategory_id` int(11) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `deletedAt` int(11) NOT NULL DEFAULT 0 COMMENT '1=deleted,0=notDeleted',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '1=activate,0=deactivate',
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobileNo`, `email`, `password`, `accountCategory_id`, `otp`, `deletedAt`, `createdAt`, `status`, `updatedAt`) VALUES
(1, 'krishna shinde', '9753489061', 'krishnashinde321@gmail.com', '0', 1, '', 0, '2022-09-20 17:47:45', 0, '2022-09-20 17:51:25'),
(2, 'mohit shinde', '9754261325', 'mohitshinde321@gmail.com', '0', 1, '', 0, '2022-09-20 17:50:48', 0, '2022-09-20 17:50:48'),
(3, 'anshule shinde', '9993149631', 'anshulshinde321@gmail.com', '0', 1, '', 0, '2022-09-20 17:55:10', 0, '2022-09-20 17:55:10'),
(4, 'prince shinde', '9685815179', 'anshulshinde321@gmail.com', '0', 1, '', 0, '2022-09-20 18:03:02', 0, '2022-09-20 18:03:02'),
(5, 'shubham yadav', '9685815178', 'shubhamyadav321@gmail.com', '0', 1, '2330', 0, '2022-09-21 10:38:12', 0, '2022-09-21 10:38:12'),
(6, 'kunal yadav', '9685815177', 'kunalyadav321@gmail.com', '$2a$10$8v6E9FwYPqhkFBWTwSzVF.y510POnwTVSJoLZdt4TF3Ak00Obss8O', 1, '7427', 0, '2022-09-21 12:07:00', 0, '2022-09-21 15:33:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountcategory`
--
ALTER TABLE `accountcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountcategory`
--
ALTER TABLE `accountcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
