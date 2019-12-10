-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2019 at 11:40 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tartl`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `aid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `awith` varchar(20) NOT NULL,
  `subject` varchar(20) NOT NULL,
  `awhen` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`aid`, `uid`, `awith`, `subject`, `awhen`) VALUES
(1, 1, 'mukesh macha', 'dentist', '2019-12-19 01:30:00'),
(2, 1, 'rahusdf', 'optho', '2019-12-27 04:30:00'),
(9, 1, 'ajay', 'therapist', '2019-12-17 10:08:18'),
(10, 1, 'trainer', 'exercise', '2019-12-12 08:00:00'),
(64, 1, 'asd', 'fdsf', '2019-12-10 01:52:23'),
(65, 1, 'test1', 'testing concurrency', '2019-12-10 07:26:09'),
(66, 1, 'test1', 'con2', '2019-12-10 07:28:25'),
(67, 1, 'test1', 'con3', '2019-12-10 07:29:17'),
(68, 1, 'test1', 'con3', '2019-12-10 07:31:18'),
(69, 1, 'test1', 'con5', '2019-12-10 07:33:09'),
(70, 1, 'test1', 'xcvxcv', '2019-12-10 07:39:39'),
(71, 3, 'zaid', 'con6', '2019-12-10 07:42:10'),
(72, 1, 'ghfghfgh', 'gfdfg', '2019-12-10 08:46:46');

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `rid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `rwhen` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`rid`, `uid`, `subject`, `description`, `rwhen`) VALUES
(2, 1, 'cnn', 'learn convoltion neural networks for ml', '2019-12-17 00:00:00'),
(3, 1, 'aws doneda', 'learn hosting on aws', '2019-12-20 00:30:24'),
(4, 1, 'consistent hashing asdasd', 'learn consistent hashing for system desing', '2019-12-16 12:00:00'),
(5, 1, 'flask', 'learn flask', '2019-12-26 02:30:00'),
(6, 1, 'blockchain', 'learn blockchain for hackathon', '2019-12-12 00:00:00'),
(7, 1, 'typescript', 'learn typescript', '2019-12-12 00:00:00'),
(8, 1, 'graohQl', 'learn graphQL', '2019-12-28 06:30:00'),
(9, 1, 'done', 'this project', '2019-12-08 12:00:00'),
(17, 1, 'dsfsdf', 'gfdfdg', '2019-12-10 07:22:33'),
(18, 1, 'dfsdf', 'gdfg', '2019-12-10 08:29:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'zaid', '12345678'),
(2, 'NEWuSER', '546231'),
(3, 'test1', '12345678'),
(4, 'sdfdsf', 'gfhgfhf'),
(5, 'player3', 'dsfsdf'),
(6, 'player4', '5321321564');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`rid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
