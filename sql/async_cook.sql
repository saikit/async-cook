-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 27, 2025 at 08:42 PM
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
-- Table structure for table `context`
--

CREATE TABLE `context` (
  `id` int NOT NULL,
  `ingredient_id` int DEFAULT NULL,
  `instruction_id` int DEFAULT NULL,
  `category` varchar(15) NOT NULL,
  `note` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `context`
--

INSERT INTO `context` (`id`, `ingredient_id`, `instruction_id`, `category`, `note`) VALUES
(1, 2, NULL, 'explanation', 'The peel will prevent the garlic from burning'),
(2, NULL, 1, 'explanation', 'Parchment paper is non-stick. Putting tomatoes flesh side up prevents the tomato skins from burning. Single layer prevents crowding'),
(3, 10, NULL, 'recommendation', 'Most types of dried pasta will work, but be sure to use a pot that will fit your dried pasta of choice easily'),
(4, 21, NULL, 'recommendation', 'Fish sauce pairs well with tomato-based sauces'),
(5, NULL, 2, 'alert', 'Use a small amount of baking soda prevents the shrimp from becoming mushy'),
(6, NULL, NULL, '', ''),
(7, 37, NULL, 'recommendation', 'Any leafy green will work for this dish'),
(8, NULL, 14, 'recommendation', 'If serving with rice, wash and cook rice first. Keep rice warm until ready to serve'),
(9, 43, NULL, '', 'If using seasoned soy sauce, reduce or omit the sugar'),
(10, 47, NULL, '', 'For larger cuts of tuna, chop into smaller pieces'),
(11, NULL, 16, 'recommendation', 'Water for blanching should very salty'),
(12, 60, NULL, 'recommendation', 'Freeze sweet pototoes overnight before cooking to improve its texture'),
(13, 59, NULL, 'recommendation', 'Any larger long-cooking bean will work'),
(14, 69, NULL, 'recommendation', 'Any vinegar-based hot sauce will also work'),
(15, 72, NULL, 'recommendation', 'Traditionally, glutinous rice is used, but any rice will work'),
(16, 73, NULL, 'alert', 'Replace with liquid from soaking dried shiitake mushrooms if using'),
(17, 74, NULL, 'recommendation', 'You may adjust water amount based on preferred texture'),
(18, 76, NULL, '', 'Dried shiitake mushrooms are traditional, but any dried or fresh mushrooms will work'),
(19, 77, NULL, 'recommendation', 'Other cured or preserved meats such as bacon works as well'),
(20, 79, NULL, 'recommendation', 'Any flavored oils and fats will work'),
(21, 12, NULL, 'recommendation', 'Use just enough to season pasta if you plan to use the pasta water');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `name` text NOT NULL,
  `cooked` tinyint(1) NOT NULL DEFAULT '0',
  `optional` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `step` int NOT NULL,
  `ing_order` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `recipe_id`, `name`, `cooked`, `optional`, `step`, `ing_order`) VALUES
(1, 1, '340g-450g cherry tomatoes', 0, NULL, 1, 1),
(2, 1, '3-4 unpeeled cloves of garlic', 0, NULL, 1, 2),
(3, 1, '30g extra virgin olive oil', 0, NULL, 1, 3),
(4, 1, 'Salt', 0, NULL, 1, 4),
(5, 1, 'Black Pepper', 0, NULL, 1, 5),
(6, 1, '120g raw shrimp', 0, NULL, 2, 1),
(7, 1, 'Salt', 0, NULL, 2, 2),
(8, 1, 'Baking soda', 0, NULL, 2, 3),
(9, 1, '120g mozzarella cheese', 0, NULL, 3, 1),
(10, 1, '150g dried pasta', 0, NULL, 4, 1),
(11, 1, '600ml water', 0, NULL, 4, 2),
(12, 1, 'Salt', 0, NULL, 4, 3),
(13, 1, 'Seasoned shrimp', 1, NULL, 5, 1),
(14, 1, 'Dried basil', 0, NULL, 6, 1),
(15, 1, 'Red pepper flakes', 0, NULL, 6, 2),
(16, 1, 'Cooked pasta', 1, NULL, 6, 3),
(17, 1, 'Cooked pasta water', 1, NULL, 6, 4),
(18, 1, '20g grated cheese', 0, NULL, 6, 5),
(19, 1, 'Black pepper', 0, NULL, 6, 6),
(20, 1, 'Extra virgin olive oil', 0, NULL, 6, 7),
(21, 1, 'Salt or fish sauce', 0, NULL, 6, 8),
(34, 1, 'Cooked shrimp', 1, 'Shrimp', 6, 9),
(35, 1, 'Extra Grated cheese (for serving)', 0, NULL, 7, 1),
(36, 1, 'Sliced Mozzarella', 1, 'Mozzarella', 7, 2),
(37, 2, '200g Lettuce\r\n', 0, NULL, 1, 1),
(38, 2, '1 scallion\r\n', 0, NULL, 1, 2),
(39, 2, '3 cloves garlic', 0, NULL, 1, 3),
(40, 2, '20g oyster sauce\r\n', 0, NULL, 2, 1),
(43, 2, '10ml soy sauce', 0, NULL, 2, 2),
(44, 2, '2g sugar', 0, NULL, 2, 3),
(45, 2, '2g dark soy sauce', 0, NULL, 2, 4),
(46, 2, 'A sprinkle of MSG (optional)\r\n', 0, NULL, 2, 5),
(47, 2, '1 5oz can of chunk light tuna, undrained', 0, NULL, 2, 6),
(48, 2, '1g cornstarch', 0, NULL, 3, 1),
(49, 2, '20 ml water\r\n', 0, NULL, 3, 2),
(50, 2, '500 ml water', 0, NULL, 4, 1),
(51, 2, '10g salt', 0, NULL, 4, 2),
(52, 2, '10g neutral cooking oil', 0, NULL, 5, 1),
(53, 2, 'Minced garlic', 1, NULL, 5, 2),
(54, 2, 'Chopped scallion', 1, NULL, 5, 3),
(55, 2, 'Red pepper flakes', 0, NULL, 5, 4),
(56, 2, 'Chopped lettuce', 1, NULL, 6, 1),
(57, 2, 'Finished sauce', 1, NULL, 7, 2),
(58, 2, 'Cooked lettuce', 1, NULL, 7, 1),
(59, 4, '225g dried pinto beans', 0, NULL, 1, 1),
(60, 4, '300-400g sweet potato', 0, NULL, 2, 1),
(65, 4, '1 Avocado', 0, NULL, 3, 1),
(66, 4, 'Extra virgin olive oil', 0, NULL, 4, 2),
(67, 4, 'Red wine vinegar', 0, NULL, 4, 3),
(68, 4, 'Black pepper', 0, NULL, 4, 4),
(69, 4, 'Tajin seasoning (optional)', 0, NULL, 4, 5),
(70, 4, 'Cooked beans', 1, NULL, 4, 1),
(71, 4, 'Sliced avocado', 1, NULL, 5, 1),
(72, 3, '150g split mung beans', 0, NULL, 1, 1),
(73, 3, '150g rice', 0, NULL, 1, 2),
(74, 3, '485g water', 0, NULL, 1, 3),
(75, 3, '15g soy sauce (optional)', 0, NULL, 1, 4),
(76, 3, '80g mushrooms', 0, NULL, 2, 1),
(77, 3, '80g chinese sausage', 0, NULL, 3, 1),
(78, 3, 'Rice and mung beans mixture', 1, NULL, 4, 1),
(79, 3, '15g lard or butter', 0, NULL, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_groups`
--

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
(1, 1, 1, 'Roasted tomatoes and garlic', NULL),
(2, 1, 2, 'Shrimp', 'Shrimp'),
(3, 1, 4, 'Pasta', NULL),
(4, 1, 3, NULL, 'Mozzarella'),
(5, 1, 5, NULL, 'Shrimp'),
(6, 1, 6, NULL, NULL),
(7, 1, 7, NULL, NULL),
(8, 2, 1, NULL, NULL),
(9, 2, 2, 'Sauce', NULL),
(10, 2, 3, 'Cornstarch slurry', NULL),
(11, 2, 4, NULL, NULL),
(12, 2, 5, NULL, NULL),
(13, 2, 6, NULL, NULL),
(14, 2, 7, NULL, NULL),
(15, 4, 1, 'Beans', NULL),
(16, 4, 2, NULL, NULL),
(17, 4, 3, NULL, 'Avocado'),
(18, 4, 4, NULL, NULL),
(19, 4, 5, NULL, 'Avocado'),
(20, 3, 1, 'Rice and mung beans', NULL),
(21, 3, 2, NULL, 'Mushrooms'),
(22, 3, 3, NULL, 'Chinese sausage'),
(23, 3, 4, NULL, NULL),
(24, 3, 5, NULL, 'Fats');

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `step` int NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `background` varchar(100) DEFAULT NULL,
  `optional` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `int_order` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `recipe_id`, `step`, `text`, `background`, `optional`, `int_order`) VALUES
(1, 1, 1, 'Wash and cut **cherry tomatoes** in half. Toss tomatoes in bowl with **olive oil**, **salt**, and **pepper**. Place tomatoes and **garlic** on a parchment-lined baking sheet flesh side up and in a single layer. Roast in an oven at **450&deg;F** for **25-30 minutes**', NULL, NULL, 1),
(2, 1, 2, 'Season **raw shrimp** with **salt** and a pinch of **baking soda**', 'Tomatoes and garlic are in the oven', 'Shrimp', 1),
(3, 1, 3, 'Slice **mozzarella**', 'Tomatoes and garlic are in the oven', 'Mozzarella', 1),
(4, 1, 4, 'Boil **pasta** in **salted** **water** for **1-2 minutes** before instructions for al dente. Set aside pasta and pasta cooking water.', 'Tomatoes and garlic are in the oven', NULL, 1),
(5, 1, 5, 'Fry **seasoned shrimp** in a pan in high heat for **1 minute** until slightly brown. Remove from heat.', NULL, 'Shrimp', 1),
(6, 1, 6, 'Remove peel from garlic. Pour roasted tomatoes and garlic into pan. Add **basil** and **red pepper flakes** to sauce mixture. Add **cooked pasta** and some of the **cooked pasta water** to pan and stir on high heat', NULL, NULL, 1),
(7, 1, 7, 'Serve pasta with extra **grated cheese** and **extra virgin olive oil**', NULL, NULL, 1),
(8, 1, 6, 'Remove pan from heat and add most or all of the **grated cheese**.', NULL, NULL, 2),
(9, 1, 6, 'Return pan to heat and add **black pepper** and **olive oil** and stir for another **30 seconds**.', NULL, NULL, 3),
(10, 1, 6, 'Add **salt** to taste. Add more pasta water to adjust consistency.', NULL, NULL, 4),
(11, 1, 6, 'Add **cooked shrimp** to pasta and toss to combine', NULL, 'Shrimp', 5),
(13, 1, 7, 'Top pasta with **sliced mozzarella**', NULL, 'Mozzarella', 2),
(14, 2, 1, '\"Wash and chop **lettuce** into bite sized pieces. Wash and chop **scallions** to rounds. Peel and mince **garlic cloves**.', NULL, NULL, 1),
(15, 2, 2, 'Combine **oyster sauce**, **soy sauce**, **dark soy sauce**, **canned tuna**, and **sugar**, and **MSG** in a bowl. Mix well. ', NULL, NULL, 1),
(16, 2, 4, 'Heat a pot of **salted water** to a boil.', NULL, NULL, 1),
(17, 2, 5, 'In a pan, heat up **neutral oil** over high heat until slightly smoking. Add **minced garlic**, **chopped scallion**, and **red pepper flake**s and fry until aromatic.', 'Water is boiling', NULL, 1),
(18, 2, 5, 'Add **combined sauce** to pan. Cook briefly then set flame to low and add **cornstarch slurry**. Cook until sauce is thickened.', NULL, NULL, 2),
(19, 2, 6, 'Add **chopped lettuce** to the salted boiling water and cook until leaves turn bright green. Remove lettuce from pan and drain well.', NULL, NULL, 1),
(20, 2, 7, 'Serve **lettuce** with **sauce** drizzled on top.', NULL, NULL, 1),
(21, 2, 3, 'Combine **cornstarch** and **water** in a separate bowl. Mix well.', NULL, NULL, 1),
(22, 4, 1, 'Rinse **beans** and then combine with **salt**, **baking soda**, **water** in an electric pressure cooker. Set pressure cooker to 50 minutes. Allow for natural release.', NULL, NULL, 1),
(23, 4, 2, 'On a baking sheet covered with foil, place **sweet potatoes** in **450°F** oven for **50 minutes** or until interior is soft.', NULL, NULL, 1),
(24, 4, 3, 'Open and slice **avocado**.', 'Sweet potatoes are in the oven', 'Avocado', 1),
(25, 4, 4, 'Drain **cooked beans** and place in mixing bowl. Peel **cooked sweet potatoes** and to bowl. Combine with **olive oil**, **vinegar**, and **black pepper** and serve. Top with **tajin seasoning** if using.', NULL, NULL, 1),
(26, 4, 5, 'Top bowl with **sliced avocado**. Add more olive oil, black pepper, or Tajin seasoning if using.', NULL, 'Avocado', 1),
(27, 3, 1, 'Rinse and combine **mung beans** and **rice**. Add mixture to rice cooker or pressure cooker', NULL, NULL, 1),
(28, 3, 2, 'Wash **mushrooms** and dice into small pieces. Add to mung bean and rice mixture\r\n', NULL, 'Mushrooms', 1),
(29, 3, 3, 'Dice **chinese sausage** into small pieces. Add to mung bean and rice mixture\r\n', NULL, 'Chinese sausage', 1),
(30, 3, 4, 'Cook **mixture** in electric pressure cooker for 15 minutes on high pressure or normal setting in a rice cooker. Natural release if using pressure cooker.', NULL, NULL, 1),
(31, 3, 5, 'Mix cooked rice and beans with **lard or butter** before serving', NULL, 'Fats', 1);

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `intro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `reference` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `optional_ingredients` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `slug`, `category`, `title`, `intro`, `reference`, `optional_ingredients`) VALUES
(1, 'pasta', '', 'Roasted Tomato and Garlic Pasta', 'My spin on a recipe inspired by Kenji Lopez-Alt\'s quick fresh tomato pasta. Roasting the tomatoes in the over adds additional with less mess.', 'https://www.seriouseats.com/fast-easy-pasta-blistered-cherry-tomato-sauce-recipe', 'Shrimp,Mozzarella'),
(2, 'lettuce', '', 'Boiled Lettuce with Garlic and Oyster Sauce', 'Based on Lucas Sin\'s recipe of the same name, I added can of tuna in order to make the dish a more complete meal and to help thicken the sauce. Serve with white rice.', 'https://food52.com/recipes/90179-chinese-style-lettuce-with-garlic-and-oyster-sauce', NULL),
(3, 'weekday-zongzi', 'rice-pulses', 'Weekday Zongzi', 'This is a reimagined version of a Cantonese zongzi. This version highlights the benefits of eating pulses like mung beans to reach macronutrient goals.', 'https://www.madewithlau.com/recipes/bamboo-sticky-rice', 'Chinese sausage,Mushrooms,Fats'),
(4, 'bean-sweet-potato', 'rice-pulses', 'Sweet Potato and Bean Bowl', 'Combining two long cooking ingredients to form a base of a high protein and highly customizable meal.', NULL, 'Avocado');

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

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
(26, 3, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `context`
--
ALTER TABLE `context`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredient_groups`
--
ALTER TABLE `ingredient_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `context`
--
ALTER TABLE `context`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `ingredient_groups`
--
ALTER TABLE `ingredient_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
