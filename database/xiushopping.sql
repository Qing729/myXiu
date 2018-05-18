/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.20-log : Database - xiushopping
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`xiushopping` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `xiushopping`;

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `g_id` int(11) NOT NULL COMMENT '商品id',
  `u_id` int(11) NOT NULL COMMENT '用户id',
  `c_name` varchar(50) DEFAULT NULL COMMENT '购物车商品名',
  `c_price` varchar(10) DEFAULT NULL COMMENT '购物车商品价格',
  `c_total` varchar(10) DEFAULT NULL COMMENT '购物车商品总价',
  `c_num` varchar(10) DEFAULT NULL COMMENT '购物车商品数量',
  `c_path` varchar(50) DEFAULT NULL COMMENT '购物车商品默认图片',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

/*Data for the table `cart` */

insert  into `cart`(`c_id`,`g_id`,`u_id`,`c_name`,`c_price`,`c_total`,`c_num`,`c_path`) values (5,2,2,'女士拼色翻领羊毛大衣','29900','299000','10','src/images/img_shopping/g2_66_88.jpg'),(11,3,2,'男士乐福鞋 Stanway Easy','940','6580','7','src/images/img_shopping/g3_66_88.jpg'),(25,6,5,'女士手提包 1621002 深棕色','999','4995','5','src/images/img_shopping/g1_66_88.jpg'),(26,10,5,'女士金典时尚雪地靴 1016422-CHESTNUT','1599','3198','2','src/images/img_shopping/g1_66_88.jpg');

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `g_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `g_name` varchar(50) NOT NULL COMMENT '商品名',
  `g_price` varchar(10) NOT NULL COMMENT '商品价格',
  `g_number` varchar(10) NOT NULL COMMENT '商品库存',
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

insert  into `goods`(`g_id`,`g_name`,`g_price`,`g_number`) values (1,'MR8209多士炉 吐司机早餐机 烤面包机','299','999'),(2,'女士拼色翻领羊毛大衣','29900','100'),(3,'男士乐福鞋 Stanway Easy','940','99'),(4,'【品牌直供】日本药妆 五合一凝露两件套装','510','120'),(5,'男士立领修身毛呢大衣','930','99'),(6,'女士手提包 1621002 深棕色','999','1000'),(7,'【品牌直供】女士迷你羽毛钻石吊坠','2130','666'),(8,'DW新品黑盘时尚男士石英手表DW00100127','1199','50'),(9,'男士羊毛圆领刺绣美杜莎半头像羊绒衫','2610','100'),(10,'女士金典时尚雪地靴 1016422-CHESTNUT','1599','1200'),(11,'【品牌直供】女士三色金 三重奏爱之结耳环','1690','99'),(12,'女士格纹棉连帽衫','3430','2000'),(13,'男士牛皮肩挎包','6210','300'),(14,'反绒皮粗跟踝靴','1760','2000'),(15,'日本天然植物性护发白发用染发膏2支装','420','10000'),(16,'黑色系带牛皮保暖商务正装男款短靴','349','999');

/*Table structure for table `goodsimages` */

DROP TABLE IF EXISTS `goodsimages`;

CREATE TABLE `goodsimages` (
  `img_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片id',
  `g_id` int(11) NOT NULL COMMENT '商品id',
  `img_path` varchar(100) DEFAULT NULL COMMENT '图片路径',
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

/*Data for the table `goodsimages` */

insert  into `goodsimages`(`img_id`,`g_id`,`img_path`) values (1,1,'src/images/img_index/h5.jpg'),(2,1,'src/images/img_shopping/g1_402_536.jpg'),(6,1,'src/images/img_shopping/g1_66_88.jpg'),(15,2,'src/images/img_index/h6.jpg'),(16,2,'src/images/img_shopping2/g1_402_536.jpg'),(17,3,'src/images/img_index/h7.jpg'),(18,3,'src/images/img_shopping3/g1_402_536.jpg'),(19,4,'src/images/img_index/h8.jpg'),(20,4,'src/images/img_shopping4/g1_402_536.jpg'),(21,2,'src/images/img_shopping/g2_66_88.jpg'),(22,3,'src/images/img_shopping/g3_66_88.jpg'),(23,4,'src/images/img_shopping/g4_66_88.jpg'),(24,5,'src/images/img_index/h1.jpg'),(25,5,'src/images/img_shopping/g2_402_536_2.jpg'),(26,5,'src/images/img_shopping/g1_66_88.jpg'),(27,6,'src/images/img_index/h2.jpg'),(28,6,'src/images/img_shopping2/g2_402_536_2.jpg'),(29,6,'src/images/img_shopping/g1_66_88.jpg'),(30,7,'src/images/img_index/h3.jpg'),(31,7,'src/images/img_shopping3/g1_402_536_2.jpg'),(32,7,'src/images/img_shopping/g1_66_88.jpg'),(33,8,'src/images/img_index/h4.jpg'),(34,8,'src/images/img_shopping4/g1_402_536_2.jpg'),(35,8,'src/images/img_shopping/g1_66_88.jpg'),(36,9,'src/images/img_index/h9.jpg'),(37,9,'src/images/img_shopping/g1_402_536_3.jpg'),(38,9,'src/images/img_shopping/g1_66_88.jpg'),(39,10,'src/images/img_index/h10.jpg'),(40,10,'src/images/img_shopping2/g1_402_536_3.jpg'),(41,10,'src/images/img_shopping/g1_66_88.jpg'),(42,11,'src/images/img_index/h11.jpg'),(43,11,'src/images/img_shopping3/g1_402_536_3.jpg'),(44,11,'src/images/img_shopping/g1_66_88.jpg'),(45,12,'src/images/img_index/h12.jpg'),(46,12,'src/images/img_shopping4/g1_402_536_3.jpg'),(47,12,'src/images/img_shopping/g1_66_88.jpg'),(48,13,'src/images/img_index/h13.jpg'),(49,13,'src/images/img_shopping2/g2_402_536_2.jpg'),(50,13,'src/images/img_shopping/g1_66_88.jpg'),(51,14,'src/images/img_index/h14.jpg'),(52,14,'src/images/img_shopping3/g1_402_536.jpg'),(53,14,'src/images/img_shopping/g1_66_88.jpg'),(54,15,'src/images/img_index/h15.jpg'),(55,15,'src/images/img_shopping4/g1_402_536.jpg'),(56,15,'src/images/img_shopping/g1_66_88.jpg'),(57,16,'src/images/img_index/h16.jpg'),(58,16,'src/images/img_shopping4/g1_402_536_4.jpg'),(59,16,'src/images/img_shopping/g1_66_88.jpg');

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `userName` varchar(20) NOT NULL COMMENT '用户名',
  `userPwd` varchar(20) NOT NULL COMMENT '用户密码',
  `userTel` varchar(11) NOT NULL COMMENT '用户手机号码',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `userTel` (`userTel`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `userinfo` */

insert  into `userinfo`(`u_id`,`userName`,`userPwd`,`userTel`) values (1,'123123','123123','13123456789'),(2,'121212','123456','13212345678'),(3,'vae279','1234567','13123456787'),(4,'123','123123','15712345678'),(5,'青279','1007279','15297863910');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
