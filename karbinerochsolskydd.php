<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="styles/karbinerochsolskydd.css">
	<title>Olof Bjerke - Karbiner och solskydd</title>
</head>
<body>
	<header>
		<div>
			<hgroup>
				<h1>Karbiner och solskydd</h1>
				<h2>Olof och Frida i Thailand 2013</h2>
			</hgroup>
		</div>
	</header>

	<section>
		<article>
			<div class="masonry">
				<? if ($handle = opendir('img/album/thailand_2013/thumbs/')):
					while (false !== ($entry = readdir($handle))):
						if ($entry != "." && $entry != ".."): ?>
							<a href="img/album/thailand_2013/thumbs/<?= $entry ?>">
								<img src="img/album/thailand_2013/thumbs/<?= $entry ?>" class="brick" alt="">
							</a>
				<?	
				endif;
				endwhile; 
					closedir($handle);
				endif; ?>
				<div style="clear:both"></div>
			</div>
		</article>		
	</section>
	<div class="popup"></div>
	<footer>
		<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="js/karbinerochsolskydd.js"></script>
	</footer>
</body>
<html>