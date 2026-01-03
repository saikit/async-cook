-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 03, 2026 at 07:19 AM
-- Server version: 8.0.32
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saikithui`
--

-- --------------------------------------------------------

--
-- Table structure for table `calculator`
--

DROP TABLE IF EXISTS `calculator`;
CREATE TABLE `calculator` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `ingredient_group_id` int NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `calculator`
--

INSERT INTO `calculator` (`id`, `recipe_id`, `ingredient_group_id`, `text`) VALUES
(1, 3, 20, 'For each gram of mung beans, add **2ml** of water. For each gram of rice, add **1ml** of water. \r\n\r\n`(mung beans x 2) + rice = water + soy sauce`\r\n\r\nAdjust soy sauce amount to desired taste'),
(2, 4, 15, 'For each gram of beans, add **4ml** of water. Ensure that beans are submerged throughout cooking process.'),
(3, 5, 33, 'For each gram of lentils, add **2ml** of water. For each gram of rice, add **1ml** of water. \r\n\r\n`(lentils x 2) + rice = water + salt`\r\n\r\nAdjust salt amount to desired taste');

-- --------------------------------------------------------

--
-- Table structure for table `context`
--

DROP TABLE IF EXISTS `context`;
CREATE TABLE `context` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `ingredient_id` int DEFAULT NULL,
  `instruction_id` int DEFAULT NULL,
  `category` varchar(15) NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `context`
--

INSERT INTO `context` (`id`, `recipe_id`, `ingredient_id`, `instruction_id`, `category`, `note`) VALUES
(1, 1, 2, NULL, 'explanation', 'The peel will prevent the garlic from burning.'),
(2, 1, NULL, 1, 'explanation', 'Parchment paper is non-stick. Putting tomatoes flesh side up prevents the tomato skins from burning. Single layer prevents crowding.'),
(3, 1, 10, NULL, 'recommendation', 'Most types of dried pasta will work, but be sure to use a pot that will fit your dried pasta of choice easily.'),
(4, 1, 21, NULL, 'recommendation', 'Fish sauce pairs well with tomato-based sauces.'),
(5, 1, NULL, 2, 'alert', 'Use a small amount of baking soda prevents the shrimp from becoming mushy.'),
(7, 2, 37, NULL, 'recommendation', 'Any leafy green will work for this dish.'),
(8, 2, NULL, 14, 'recommendation', 'If serving with rice, wash and cook rice first. Keep rice warm until ready to serve.'),
(9, 2, 43, NULL, 'recommendation', 'If using seasoned soy sauce, reduce or omit the sugar.'),
(10, 2, 47, NULL, 'recommendation', 'For larger cuts of tuna, chop into smaller pieces.'),
(11, 2, NULL, 16, 'recommendation', 'Water for blanching should be very salty.'),
(12, 4, 60, NULL, 'recommendation', 'Freeze sweet potatoes for 3 or more hours before cooking to improve its texture.'),
(13, 4, 59, NULL, 'recommendation', 'Any larger long-cooking bean will work.'),
(14, 4, 69, NULL, 'recommendation', 'Any vinegar-based hot sauce or seasoning will also work.'),
(15, 3, 72, NULL, 'recommendation', 'Traditionally, glutinous rice is used, but any rice will work.'),
(16, 3, 73, NULL, 'alert', 'Replace with liquid from soaking dried shiitake mushrooms if using.'),
(17, 3, 74, NULL, 'recommendation', 'You may adjust water amount based on preferred texture.'),
(18, 3, 76, NULL, 'recommendation', 'Dried shiitake mushrooms are traditional, but any dried or fresh mushrooms will work.'),
(19, 3, 77, NULL, 'recommendation', 'Other cured or preserved meats such as bacon works as well.'),
(20, 3, 79, NULL, 'recommendation', 'Any flavored oils and fats will work.'),
(21, 1, 12, NULL, 'recommendation', 'Use just enough to season pasta if you plan to use the pasta water.'),
(22, 1, 14, NULL, 'recommendation', 'If using fresh basil, chop into smaller pieces.'),
(23, 6, NULL, 47, 'recommendation', 'Separate the leaves and the stem. Stem can be cut further to smaller pieces'),
(30, 5, 149, NULL, 'recommendation', 'Basmati is traditionally used, but any type of rice will work'),
(31, 5, 154, NULL, 'alert', 'Because the recipe involves making crispy onions and caramelized onions simultaneously, feel free to skip one of them'),
(32, 5, NULL, 57, 'explanation', 'Add just enough water to cook through the onions before it evaporates');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `id` int NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `description`) VALUES
(1, 'Electric Pressure Cooker', 'Electric pressure cookers are highly recommended, especially for places with small kitchens or even no kitchen. They can cook certain items quickly without supervision while you focus on other tasks.'),
(2, 'Oven', 'Something as small as a toaster oven is useful. Useful for browning meats and vegetables.'),
(3, 'Microwave', 'Microwaves are more versatile than just reheating food. Steaming root vegetables and frying small amounts of aromatics are among some of the uses.'),
(4, '2 Burners', 'Cooking will be faster using two burners at the same time, but all recipes can be completed with only one.');

-- --------------------------------------------------------

--
-- Table structure for table `icons`
--

DROP TABLE IF EXISTS `icons`;
CREATE TABLE `icons` (
  `id` int NOT NULL,
  `category` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `icons`
--

INSERT INTO `icons` (`id`, `category`) VALUES
(2, 'alert'),
(3, 'explanation'),
(1, 'recommendation');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE `ingredients` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `variable` int DEFAULT NULL,
  `name` text NOT NULL,
  `fdc_id` int DEFAULT NULL,
  `cooked` tinyint(1) NOT NULL DEFAULT '0',
  `optional` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `step` int NOT NULL,
  `ing_order` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `recipe_id`, `quantity`, `unit`, `variable`, `name`, `fdc_id`, `cooked`, `optional`, `step`, `ing_order`) VALUES
(1, 1, 340, 'g', NULL, 'cherry tomatoes', 2023153, 0, NULL, 1, 1),
(2, 1, 3, NULL, NULL, 'unpeeled cloves of garlic', NULL, 0, NULL, 1, 2),
(3, 1, 30, 'g', NULL, 'extra virgin olive oil', 748608, 0, NULL, 1, 3),
(4, 1, NULL, NULL, NULL, 'salt', NULL, 0, NULL, 1, 4),
(5, 1, NULL, NULL, NULL, 'black pepper', NULL, 0, NULL, 1, 5),
(6, 1, 120, 'g', NULL, 'raw shrimp', 2684443, 0, NULL, 2, 1),
(7, 1, NULL, NULL, NULL, 'salt', NULL, 0, NULL, 2, 2),
(8, 1, NULL, NULL, NULL, 'a pinch of baking soda', NULL, 0, NULL, 2, 3),
(9, 1, 120, 'g', NULL, 'mozzarella cheese', 170846, 0, NULL, 3, 1),
(10, 1, 150, 'g', NULL, 'dried pasta', 169736, 0, NULL, 4, 1),
(11, 1, 600, 'ml', NULL, 'water', NULL, 0, NULL, 4, 2),
(12, 1, NULL, NULL, NULL, 'salt', NULL, 0, NULL, 4, 3),
(13, 1, NULL, NULL, NULL, 'seasoned shrimp', NULL, 1, NULL, 5, 1),
(14, 1, NULL, NULL, NULL, 'dried basil', NULL, 0, NULL, 6, 1),
(15, 1, NULL, NULL, NULL, 'red pepper flakes', NULL, 0, NULL, 6, 2),
(16, 1, NULL, NULL, NULL, 'cooked pasta', NULL, 1, NULL, 6, 3),
(17, 1, NULL, NULL, NULL, 'cooked pasta water', NULL, 1, NULL, 6, 4),
(18, 1, 20, 'g', NULL, 'grated Parmesan cheese', NULL, 0, NULL, 6, 5),
(19, 1, NULL, NULL, NULL, 'black pepper', NULL, 0, NULL, 6, 6),
(20, 1, NULL, NULL, NULL, 'extra virgin olive oil', NULL, 0, NULL, 6, 7),
(21, 1, NULL, NULL, NULL, 'salt or fish sauce', NULL, 0, NULL, 6, 8),
(34, 1, NULL, NULL, NULL, 'cooked shrimp', NULL, 1, 'Shrimp', 6, 9),
(35, 1, NULL, NULL, NULL, 'grated Parmesan cheese *(for serving)*', NULL, 0, NULL, 7, 1),
(36, 1, NULL, NULL, NULL, 'sliced mozzarella', NULL, 1, 'Mozzarella', 7, 2),
(37, 2, 200, 'g', NULL, 'lettuce', 169247, 0, NULL, 1, 1),
(38, 2, 1, NULL, NULL, 'scallion', NULL, 0, NULL, 1, 2),
(39, 2, 3, NULL, NULL, 'cloves garlic', NULL, 0, NULL, 1, 3),
(40, 2, 20, 'g', NULL, 'oyster sauce', NULL, 0, NULL, 2, 1),
(43, 2, 10, 'ml', NULL, 'soy sauce', NULL, 0, NULL, 2, 2),
(44, 2, 2, 'g', NULL, 'sugar', NULL, 0, NULL, 2, 3),
(45, 2, 2, 'ml', NULL, 'dark soy sauce', NULL, 0, NULL, 2, 4),
(46, 2, NULL, NULL, NULL, 'a sprinkle of MSG *(optional)*', NULL, 0, NULL, 2, 5),
(47, 2, 1, NULL, NULL, '5oz can of chunk light tuna, undrained', 175158, 0, NULL, 2, 6),
(48, 2, 1, 'g', NULL, 'cornstarch', NULL, 0, NULL, 3, 1),
(49, 2, 20, 'ml', NULL, 'water', NULL, 0, NULL, 3, 2),
(50, 2, 500, 'ml', NULL, 'water', NULL, 0, NULL, 4, 1),
(51, 2, 10, 'g', NULL, 'salt', NULL, 0, NULL, 4, 2),
(52, 2, 10, 'g', NULL, 'neutral cooking oil', NULL, 0, NULL, 5, 1),
(53, 2, NULL, NULL, NULL, 'minced garlic', NULL, 1, NULL, 5, 2),
(54, 2, NULL, NULL, NULL, 'chopped scallion', NULL, 1, NULL, 5, 3),
(55, 2, NULL, NULL, NULL, 'red pepper flakes', NULL, 0, NULL, 5, 4),
(56, 2, NULL, NULL, NULL, 'chopped lettuce', NULL, 1, NULL, 6, 1),
(57, 2, NULL, NULL, NULL, 'finished sauce', NULL, 1, NULL, 7, 2),
(58, 2, NULL, NULL, NULL, 'cooked lettuce', NULL, 1, NULL, 7, 1),
(59, 4, 225, 'g', 4, 'dried pinto beans', 747445, 0, NULL, 1, 1),
(60, 4, 1, NULL, NULL, 'sweet potato', 2346404, 0, NULL, 2, 1),
(65, 4, 1, NULL, NULL, 'avocado', 2710824, 0, NULL, 3, 1),
(66, 4, NULL, NULL, NULL, 'extra virgin olive oil', NULL, 0, NULL, 4, 3),
(67, 4, NULL, NULL, NULL, 'red wine vinegar', NULL, 0, NULL, 4, 4),
(68, 4, NULL, NULL, NULL, 'black pepper', NULL, 0, NULL, 4, 5),
(69, 4, NULL, NULL, NULL, 'Tajín seasoning *(optional)*', NULL, 0, NULL, 4, 6),
(70, 4, NULL, NULL, NULL, 'cooked beans', NULL, 1, NULL, 4, 1),
(71, 4, NULL, NULL, NULL, 'sliced avocado', NULL, 1, NULL, 5, 1),
(72, 3, 150, 'g', 2, 'split mung beans', 174256, 0, NULL, 1, 1),
(73, 3, 150, 'g', 1, 'rice', 2512381, 0, NULL, 1, 2),
(74, 3, 435, 'g', 0, 'water', NULL, 0, NULL, 1, 3),
(75, 3, 15, 'g', -1, 'soy sauce *(optional)*', NULL, 0, NULL, 1, 4),
(76, 3, 80, 'g', NULL, 'mushrooms', 1999628, 0, NULL, 2, 1),
(77, 3, 80, 'g', NULL, 'Chinese sausage', 2066352, 0, NULL, 3, 1),
(78, 3, NULL, NULL, NULL, 'rice and mung beans mixture', NULL, 1, NULL, 4, 1),
(79, 3, 15, 'g', NULL, 'lard or butter *(optional)*', 789828, 0, NULL, 5, 2),
(80, 4, 894, 'ml', 0, 'water', NULL, 0, NULL, 1, 2),
(81, 4, 5, 'g', -1, 'salt', NULL, 0, NULL, 1, 3),
(82, 4, 1, 'g', -1, 'baking soda *(optional)*', NULL, 0, NULL, 1, 4),
(83, 3, NULL, NULL, NULL, 'cooked rice and beans', NULL, 1, NULL, 5, 1),
(84, 4, NULL, NULL, NULL, 'roasted sweet potatoes', NULL, 1, NULL, 4, 2),
(90, 6, 280, 'g', NULL, 'chicken gizzards', 171456, 0, NULL, 2, 1),
(91, 6, 250, 'ml', NULL, 'dashi or chicken stock', NULL, 0, NULL, 3, 1),
(92, 6, 15, 'g', NULL, 'miso paste', 172442, 0, NULL, 7, 1),
(93, 6, 150, 'g', NULL, 'carrots', 2258586, 0, NULL, 1, 1),
(94, 6, 150, 'g', NULL, 'daikon radish', 168451, 0, NULL, 1, 1),
(127, 6, 15, 'g', NULL, 'gochujang', NULL, 0, NULL, 4, 1),
(128, 6, 15, 'ml', NULL, 'soy sauce', NULL, 0, NULL, 4, 2),
(129, 6, 15, 'ml', NULL, 'mirin', NULL, 0, NULL, 4, 3),
(130, 6, 3, 'g', NULL, 'sugar', NULL, 0, NULL, 4, 4),
(131, 6, NULL, NULL, NULL, 'neutral cooking oil', NULL, 0, NULL, 8, 1),
(132, 6, 3, '', NULL, 'cloves of garlic', NULL, 0, NULL, 6, 1),
(133, 6, 10, 'g', NULL, 'ginger', NULL, 0, NULL, 6, 2),
(134, 6, 200, 'g', NULL, 'bok choy, any variety', 2685572, 0, NULL, 5, 1),
(142, 6, NULL, NULL, NULL, 'chopped daikon', NULL, 1, NULL, 3, 2),
(143, 6, NULL, NULL, NULL, 'chopped carrots', NULL, 1, NULL, 3, 3),
(144, 6, NULL, NULL, NULL, 'chopped gizzards', NULL, 1, NULL, 3, 1),
(145, 6, NULL, NULL, NULL, 'cooked gizzards', NULL, 1, NULL, 8, 2),
(146, 6, NULL, NULL, NULL, 'minced garlic and ginger', NULL, 1, NULL, 8, 3),
(147, 6, NULL, NULL, NULL, 'chopped bok choy', NULL, 1, NULL, 8, 4),
(148, 6, NULL, NULL, NULL, 'stir fry sauce', NULL, 1, NULL, 8, 5),
(149, 5, 150, 'g', 1, 'rice', 2512381, 0, NULL, 1, 2),
(150, 5, 150, 'g', 2, 'brown or green lentils', 2644283, 0, NULL, 1, 1),
(151, 5, 448, 'g', 0, 'water', NULL, 0, NULL, 1, 3),
(152, 5, 2, 'g', -1, 'salt', NULL, 0, NULL, 1, 4),
(154, 5, 2, NULL, NULL, 'onions', 790646, 0, NULL, 2, 1),
(155, 5, 1, NULL, NULL, 'scallion *(optional)*', NULL, 0, NULL, 2, 2),
(156, 5, 2, 'g', NULL, 'cumin seeds', NULL, 0, NULL, 4, 1),
(157, 5, NULL, '', NULL, 'extra virgin olive oil', NULL, 0, NULL, 3, 3),
(158, 5, NULL, NULL, NULL, 'salt', NULL, 0, NULL, 3, 4),
(159, 5, NULL, NULL, NULL, 'water', NULL, 0, NULL, 3, 5),
(161, 5, NULL, NULL, NULL, 'caramelized onions', NULL, 1, NULL, 4, 3),
(162, 5, NULL, NULL, NULL, 'rice and lentils', NULL, 1, NULL, 4, 4),
(163, 5, NULL, NULL, NULL, 'onion-infused oil', NULL, 1, NULL, 4, 5),
(164, 5, NULL, NULL, NULL, 'sliced scallions', NULL, 1, NULL, 4, 2),
(165, 5, NULL, NULL, NULL, 'sliced onions', NULL, 1, NULL, 3, 1),
(166, 5, NULL, NULL, NULL, 'diced onions', NULL, 1, NULL, 3, 2),
(167, 2, NULL, NULL, NULL, 'combined sauce', NULL, 1, NULL, 5, 5),
(168, 2, NULL, NULL, NULL, 'cornstarch slurry', NULL, 1, NULL, 5, 6),
(169, 1, NULL, NULL, NULL, 'extra virgin olive oil *(for serving)*', NULL, 0, NULL, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_groups`
--

DROP TABLE IF EXISTS `ingredient_groups`;
CREATE TABLE `ingredient_groups` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `step` int NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `optional` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ingredient_groups`
--

INSERT INTO `ingredient_groups` (`id`, `recipe_id`, `step`, `text`, `optional`) VALUES
(1, 1, 1, 'roasted tomatoes and garlic', NULL),
(2, 1, 2, 'shrimp', 'Shrimp'),
(3, 1, 4, 'pasta', NULL),
(4, 1, 3, NULL, 'Mozzarella'),
(5, 1, 5, NULL, 'Shrimp'),
(6, 1, 6, NULL, NULL),
(7, 1, 7, NULL, NULL),
(8, 2, 1, NULL, NULL),
(9, 2, 2, 'sauce', NULL),
(10, 2, 3, 'cornstarch slurry', NULL),
(11, 2, 4, NULL, NULL),
(12, 2, 5, NULL, NULL),
(13, 2, 6, NULL, NULL),
(14, 2, 7, NULL, NULL),
(15, 4, 1, 'beans', NULL),
(16, 4, 2, NULL, NULL),
(17, 4, 3, NULL, 'Avocado'),
(18, 4, 4, NULL, NULL),
(19, 4, 5, NULL, 'Avocado'),
(20, 3, 1, 'rice and mung beans', NULL),
(21, 3, 2, NULL, 'Mushrooms'),
(22, 3, 3, NULL, 'Chinese sausage'),
(23, 3, 4, NULL, NULL),
(24, 3, 5, NULL, NULL),
(25, 6, 4, 'stir fry sauce', NULL),
(26, 6, 1, NULL, NULL),
(27, 6, 2, NULL, NULL),
(28, 6, 3, NULL, NULL),
(29, 6, 5, NULL, NULL),
(30, 6, 6, NULL, NULL),
(31, 6, 7, NULL, NULL),
(32, 6, 8, NULL, NULL),
(33, 5, 1, 'rice and lentils', NULL),
(34, 5, 2, NULL, NULL),
(35, 5, 3, NULL, NULL),
(36, 5, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

DROP TABLE IF EXISTS `instructions`;
CREATE TABLE `instructions` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `step` int NOT NULL,
  `title` varchar(72) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `background` varchar(100) DEFAULT NULL,
  `optional` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `int_order` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `recipe_id`, `step`, `title`, `text`, `background`, `optional`, `int_order`) VALUES
(1, 1, 1, 'Prep and roast tomatoes & garlic', 'Wash and cut **cherry tomatoes** in half. Toss tomatoes in bowl with **olive oil**, **salt**, and **black pepper**. Place tomatoes and **garlic** on a parchment-lined baking sheet flesh side up and in a single layer. Roast in an oven at **450&deg;F** for **25-30 minutes**.', NULL, NULL, 1),
(2, 1, 2, 'Season shrimp', 'Season **raw shrimp** with **salt** and a pinch of **baking soda**.', 'Tomatoes and garlic are in the oven.', 'Shrimp', 1),
(3, 1, 3, 'Prep mozzarella', 'Slice **mozzarella**.', 'Tomatoes and garlic are in the oven.', 'Mozzarella', 1),
(4, 1, 4, 'Boil pasta', 'Boil **pasta** in **salted** **water** for **1-2 minutes** before instructions for al dente. Set aside pasta and pasta cooking water.', 'Tomatoes and garlic are in the oven.', NULL, 1),
(5, 1, 5, 'Pan-fry shrimp', 'Fry **seasoned shrimp** in a pan in high heat for **1 minute** until slightly brown. Remove from heat.', NULL, 'Shrimp', 1),
(6, 1, 6, 'Stir-fry pasta', 'Remove peel from garlic. Pour roasted tomatoes and garlic into pan. Add **basil** and **red pepper flakes** to sauce. Add **cooked pasta** and some of the **cooked pasta water** to pan and stir on high heat.', NULL, NULL, 1),
(7, 1, 7, 'Plate the pasta', 'Serve pasta with extra **grated Parmesan cheese** and **olive oil**.', NULL, NULL, 1),
(8, 1, 6, '', 'Remove pan from heat and add most or all of the **grated Parmesan cheese**.', NULL, NULL, 2),
(9, 1, 6, '', 'Return pan to heat and add **black pepper** and **olive oil** and stir for another **30 seconds**.', NULL, NULL, 3),
(10, 1, 6, '', 'Add **salt** to taste. Add more pasta water to adjust consistency.', NULL, NULL, 4),
(11, 1, 6, '', 'Add **cooked shrimp** to pasta and toss to combine.', NULL, 'Shrimp', 5),
(13, 1, 7, 'Top with mozzarella', 'Top pasta with **sliced mozzarella**.', NULL, 'Mozzarella', 1),
(14, 2, 1, 'Cut lettuce & aromatics', 'Wash and chop **lettuce** into bite sized pieces. Wash and chop **scallions** to rounds. Peel and mince **garlic cloves**.', NULL, NULL, 1),
(15, 2, 2, 'Make the sauce', 'Combine **oyster sauce**, **soy sauce**, **dark soy sauce**, **canned tuna**, and **sugar**, and **MSG** in a bowl. Mix well. ', NULL, NULL, 1),
(16, 2, 4, 'Boil water', 'Bring the **water** to a boil and add **salt**.', NULL, NULL, 1),
(17, 2, 5, 'Cook sauce', 'In a pan, heat up **neutral oil** over high heat until slightly smoking. Add **minced garlic**, **chopped scallion**, and **red pepper flakes** and fry until aromatic.', 'Water is boiling.', NULL, 1),
(18, 2, 5, '', 'Add **combined sauce** to pan. Cook briefly then set flame to low and add **cornstarch slurry**. Cook until sauce is thickened.', NULL, NULL, 2),
(19, 2, 6, 'Boil the lettuce', 'Add **chopped lettuce** to the salted boiling water and cook until leaves turn bright green. Remove lettuce from pan and drain well.', NULL, NULL, 1),
(20, 2, 7, 'Plate dish', 'Serve **lettuce** with **sauce** drizzled on top.', NULL, NULL, 1),
(21, 2, 3, 'Make the cornstarch slurry', 'Combine **cornstarch** and **water** in a separate bowl. Mix well.', NULL, NULL, 1),
(22, 4, 1, 'Cook the beans', 'Rinse **beans** and then combine with **salt**, **baking soda**, and **water** in an electric pressure cooker. Set pressure cooker to high pressure for 50 minutes. Let the pressure release naturally.', NULL, NULL, 1),
(23, 4, 2, 'Roast the sweet potatoes', 'On a baking sheet covered with foil, place **sweet potatoes** in an oven set at **450°F** for **50 minutes** or until the interior is fork tender.', NULL, NULL, 1),
(24, 4, 3, 'Prep the avocado', 'Open and slice **avocado**.', 'Sweet potatoes are in the oven.', 'Avocado', 1),
(25, 4, 4, 'Plate the dish', 'Drain **cooked beans** and place in serving bowl. Peel **roasted sweet potatoes** and cut to bite-sized pieces and add to bowl. Combine with **olive oil**, **vinegar**, and **black pepper** and serve. Top with **Tajín seasoning** if using.', NULL, NULL, 1),
(26, 4, 5, 'Top the dish with avocado', 'Top bowl with **sliced avocado**. Top with more olive oil, black pepper, or Tajín seasoning if using.', NULL, 'Avocado', 1),
(27, 3, 1, 'Prep mung beans and rice', 'Combine and wash **mung beans** and **rice** until rinsing liquid comes out clear. Combine mixture with **water** and **soy sauce** and add to rice cooker or pressure cooker.', NULL, NULL, 1),
(28, 3, 2, 'Prep the mushrooms', 'Wash **mushrooms** and dice into small pieces. Add to **mung bean and rice** mixture.\r\n', '', 'Mushrooms', 1),
(29, 3, 3, 'Prep the cured meats', 'Dice **Chinese sausage** into small pieces. Add to **mung bean and rice** mixture.\r\n', NULL, 'Chinese sausage', 1),
(30, 3, 4, 'Cook mung beans and rice', 'Cook **mixture** in electric pressure cooker for 15 minutes on high pressure or normal setting in a rice cooker. Natural release if using pressure cooker.', NULL, NULL, 1),
(31, 3, 5, 'Plate dish', 'Mix **cooked rice and beans** with **lard or butter** if using. Add more salt or soy sauce to desired taste.', NULL, '', 1),
(43, 6, 1, 'Prep radish & carrots', 'Chop **daikon radish** and **carrots** into small bite-sized pieces.\r\n', NULL, NULL, 1),
(44, 6, 2, 'Prep chicken gizzard', 'Clean **chicken gizzards** by removing membranes and string and chop into bite sized pieces.\r\n', NULL, NULL, 1),
(45, 6, 3, 'Make the soup', 'In an electric pressure cooker, combine **gizzards**, **daikon**, **carrots**, and **stock** and cook under high pressure for **30 minutes**. Let pressure release naturally.\r\n', NULL, NULL, 1),
(46, 6, 4, 'Mix stir fry sauce', 'Combine **gochujang**, **soy sauce**, **mirin**, and **sugar** in a bowl and set aside\r\n', NULL, NULL, 1),
(47, 6, 5, 'Prep bok choy', 'Wash **bok choy** and cut into bite sized pieces', NULL, NULL, 1),
(48, 6, 6, 'Prepare garlic & ginger', 'Mince **garlic** and **ginger** and set aside\r\n', NULL, NULL, 1),
(49, 6, 7, 'Finish soup', 'Remove part or all of the gizzards from the finished soup. Mix **miso paste** into soup. Keep warm.\r\n', NULL, NULL, 1),
(50, 6, 8, 'Stir fry gizzards and bok choy', 'In a pan set at high heat, heat **oil** until smoking, add **gizzards** and cook until browned.', NULL, NULL, 1),
(51, 6, 8, '', 'Set gizzards aside in pan and add **minced garlic and ginger** and cook until aromatic', NULL, NULL, 2),
(52, 6, 8, '', 'Add **bok choy** and cook until leaves and stems are wilted', NULL, NULL, 3),
(53, 6, 8, '', 'Add **stir fry sauce** and cook for another **30 seconds**', NULL, NULL, 4),
(54, 5, 1, 'Prep and cook rice and lentils', 'Combine and wash **lentils** and **rice** until rinsing liquid comes out clear. Combine mixture with **water** and **salt** and add to rice cooker or pressure cooker. Cook in electric pressure cooker for 15 minutes on high pressure or normal setting in a rice cooker. Natural release if using pressure cooker.\n\n', NULL, NULL, 1),
(55, 5, 2, 'Chop onions and aromatics', 'For the *caramelized onions*, peel and dice one of the **onions**.', NULL, NULL, 1),
(56, 5, 2, '', 'For the *crispy onions*, peel and cut the other onion into thin slices.', NULL, NULL, 2),
(57, 5, 3, 'Steam and cook onions', 'Place **sliced onions** and **diced onions** in separate pans. Add **olive oil** in each pan and season with **salt**. Add **water** and cover with a lid. Steam each at high heat for **7-10 minutes**.', 'Two pans are active', NULL, 1),
(58, 5, 3, '', 'For *caramelized onions*, once water evaporates from the pan remove the lid, lower heat to medium and add a small amount of water and deglaze the pan with a wooden spoon. Repeat the process until onions reach desired sweetness.', NULL, NULL, 2),
(59, 5, 3, '', 'For *crispy onions*, once the water evaporates from the pan remove the lid, lower heat to medium-low, and separate each slice of onion from each other. Cook until desired crispiness and then remove onions from the heat.', NULL, NULL, 3),
(60, 5, 4, 'Plate the dish', 'When the caramelized onion is cooked to the desired sweetness, add **cumin seeds** (and **sliced scallions** if using) to pan and cook for another 30 seconds. Mix **caramelized onions** and cumin to **rice and lentils**. Top the dish with **crispy onions** and the **onion-infused oil**.', NULL, NULL, 1),
(61, 5, 2, '', 'Slice **scallions** if using', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `id` int NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `intro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `reference` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `published` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `slug`, `category`, `title`, `intro`, `reference`, `published`) VALUES
(1, 'tomato-garlic-pasta', '', 'Roasted Tomato & Garlic Pasta', 'My spin on a recipe inspired by Kenji Lopez-Alt\'s quick fresh tomato pasta. Roasting the tomatoes in the oven adds additional flavor with less mess.', 'https://www.seriouseats.com/fast-easy-pasta-blistered-cherry-tomato-sauce-recipe', 1),
(2, 'tuna-oyster-sauce-lettuce', '', 'Boiled Lettuce with Garlic & Oyster Sauce', 'Based on Lucas Sin\'s recipe of the same name, I added can of tuna in order to make the dish a more complete meal and to help thicken the sauce. Serve with white rice.', 'https://food52.com/recipes/90179-chinese-style-lettuce-with-garlic-and-oyster-sauce', 1),
(3, 'weekday-rice-mungbean', 'Rice and Pulses', 'Weekday Rice & Mung Bean', 'This is a reimagined version of a Cantonese zongzi. This version highlights the benefits of eating pulses like mung beans to reach macronutrient goals.', 'https://www.madewithlau.com/recipes/bamboo-sticky-rice', 1),
(4, 'bean-sweet-potato', 'Rice and Pulses', 'Sweet Potato & Pinto Bean Bowl', 'Combining two long cooking ingredients to form a base of a high protein and highly customizable meal.', NULL, 1),
(5, 'weekday-rice-lentils', 'Rice and Pulses', 'Weekday Rice & Lentils', 'A dish inspired by the Middle Eastern dish mujadara that is ready as soon as the rice and lentils are done cooking, though it does require attention of two separate pans at the stove.\n', 'https://feelgoodfoodie.net/recipe/mujadara/\r\n', 0),
(6, 'gizzard-soup-stirfry', '', 'Chicken Gizzard Soup & Stir Fry', 'Cooking chicken gizzards in a pressure cooker to help form a base for a Japanese soup and then serving the tender gizzards in a stir-fry sauce based on Japanese grilled offal. Serve with white rice.', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

DROP TABLE IF EXISTS `steps`;
CREATE TABLE `steps` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `step` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `recipe_id`, `step`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(10, 2, 1),
(11, 2, 2),
(12, 2, 3),
(13, 2, 4),
(14, 2, 5),
(15, 2, 6),
(16, 2, 7),
(17, 4, 1),
(18, 4, 2),
(19, 4, 3),
(20, 4, 4),
(21, 4, 5),
(22, 3, 1),
(23, 3, 2),
(24, 3, 3),
(25, 3, 4),
(26, 3, 5),
(27, 6, 1),
(28, 6, 2),
(29, 6, 3),
(30, 6, 4),
(31, 6, 5),
(32, 6, 6),
(33, 6, 7),
(34, 6, 8),
(35, 5, 1),
(36, 5, 2),
(37, 5, 3),
(38, 5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `recipe_id`, `name`) VALUES
(1, 1, 'Oven'),
(2, 2, '2 Burners'),
(3, 3, 'Electric Pressure Cooker'),
(4, 4, 'Oven'),
(5, 4, 'Electric Pressure Cooker'),
(6, 5, 'Electric Pressure Cooker'),
(7, 5, '2 Burners'),
(8, 6, 'Electric Pressure Cooker');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calculator`
--
ALTER TABLE `calculator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_calculator_ingredient_group_id` (`ingredient_group_id`),
  ADD KEY `fk_calculator_recipe_id` (`recipe_id`);

--
-- Indexes for table `context`
--
ALTER TABLE `context`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_context_ingredient_id` (`ingredient_id`),
  ADD KEY `fk_context_instruction_id` (`instruction_id`),
  ADD KEY `fk_context_recipe_id` (`recipe_id`),
  ADD KEY `fk_context_icon_category` (`category`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`);

--
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category` (`category`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingredients_recipe_id` (`recipe_id`);

--
-- Indexes for table `ingredient_groups`
--
ALTER TABLE `ingredient_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingedient_groups_recipe_id` (`recipe_id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_instructions_recipe_id` (`recipe_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_steps_recipe_id` (`recipe_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tag_recipe_id` (`recipe_id`),
  ADD KEY `fk_tag_equipment_name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calculator`
--
ALTER TABLE `calculator`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `context`
--
ALTER TABLE `context`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT for table `ingredient_groups`
--
ALTER TABLE `ingredient_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calculator`
--
ALTER TABLE `calculator`
  ADD CONSTRAINT `fk_calculator_ingredient_group_id` FOREIGN KEY (`ingredient_group_id`) REFERENCES `ingredient_groups` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_calculator_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `context`
--
ALTER TABLE `context`
  ADD CONSTRAINT `fk_context_icon_category` FOREIGN KEY (`category`) REFERENCES `icons` (`category`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_context_ingredient_id` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_context_instruction_id` FOREIGN KEY (`instruction_id`) REFERENCES `instructions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_context_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `fk_ingredients_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ingredient_groups`
--
ALTER TABLE `ingredient_groups`
  ADD CONSTRAINT `fk_ingedient_groups_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `instructions`
--
ALTER TABLE `instructions`
  ADD CONSTRAINT `fk_instructions_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `fk_steps_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `tags`
--
ALTER TABLE `tags`
  ADD CONSTRAINT `fk_tag_equipment_name` FOREIGN KEY (`name`) REFERENCES `equipment` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_tag_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
