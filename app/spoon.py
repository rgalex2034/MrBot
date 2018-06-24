import discord
import numpy as np
import matplotlib.pyplot as plt
from weather import Weather, Unit
import glob
import xkcd

client = discord.Client()

@client.event
async def on_message(message):
	# we do not want the bot to reply to itself
	if message.author == client.user:
		return
		
#	if message.content.startswith('!formula'):
#		F = str(message.content).replace('!busca','')
#		plt.plot()
#		plt.text(0.5, 0.5,'{}'.format(F))
#		plt.save()

	if message.content.startswith('!joke'):
		if np.random.randint(7) > 1:
			xkcd.getRandomComic().download('./spoon_images/','xkcd.png')
			await client.send_file(message.channel,'./spoon_images/xkcd.png')
		else:
			jokes = glob.glob('./spoon_images/*')
			await client.send_file(message.channel,jokes[np.random.randint(len(jokes))])
		
	if message.content.startswith('!weather'):
		weather = Weather(unit=Unit.CELSIUS)
		place='barcelona'
		location = weather.lookup_by_location(place)
		forecasts = location.forecast
		msg = place+ '\n' + str(forecasts[0].date) + '\n' + str(forecasts[0].text) + '\nTemp. Max: ' + str(forecasts[0].high) + 'ºC \nTemp. Min: ' + str(forecasts[0].low) + 'ºC'
		await client.send_message(message.channel, msg)

	if message.content.startswith('!science'):
		if str(message.author) == 'AVillacrosa#4524':
			msg = "L'Adrià es molt llest i no necessita info. :)"
			await client.send_message(message.channel, msg)
		else:
			pool = ['La carga del protón es de 1.6021766208(98)×10−19 C','Digitalis purpurea es una planta herbácea bienal de la familia de las plantagináceas.',
			'No me apetece decir nada', 'Heimerdonger', 'Georg Friedrich Henning inventó la síntesis química de la penicilina y tambén del explosivo RDX (el mas potente no nuclear)',
			'Las medusas tienen células a 150 atmosferas de presión']
			msg = '{}'.format(pool[np.random.randint(len(pool))])
			await client.send_message(message.channel, msg)

	if message.content.startswith('!bot'):
		msg = 'Ardilla!'
		await client.send_message(message.channel, msg)
		msg = 'Quien ha dicho bot?'
		await client.send_message(message.channel, msg)
		print(message.author)
		if str(message.author) == 'miqueleg#5649':
			msg = 'AHHH, el creador!'
			await client.send_message(message.channel, msg)
			
	if message.content.startswith('!busca'):
		content = ''
		inp = str(message.content).replace('!busca','')
		for word in inp.split(' '):
			if len(content) >= 1:
				content = content+'+'+word
			else:
				content = word
		msg = 'https://www.google.es/search?q='+content
		await client.send_message(message.channel, msg)

@client.event
async def on_ready():
	print('Logged in as')
	print(client.user.name)
	print(client.user.id)
	print('------')

client.run('NDU4MzM1MDE0OTUwNjY2MjQw.DgmKpg.t4rEq8Pe4Xh6eGm3OdLae1SkJNg')
