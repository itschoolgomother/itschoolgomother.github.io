import pygame
import random
from pygame.color import THECOLORS

pygame.init()
pygame.font.init()
pygame.mixer.init()
pygame.mixer.music.load('music/jingle.mp3')
pygame.mixer.music.play(loops=-1)
pygame.mixer.music.set_volume(0.2)

scfont = pygame.font.SysFont('serif', 40)
tfont = pygame.font.SysFont('serif', 38)
gametime = 0

width = 1280
height = 720

run = True
FPS = pygame.time.Clock()

x = width/2
y = height-150
dx = 0
gameTimer = 0
score = 0
play = True

screen = pygame.display.set_mode((width, height))
bgimg = pygame.image.load('images/bg.jpg')
bgimg = pygame.transform.scale(bgimg, (width, height))
player = pygame.image.load('images/shapka.png')
player = pygame.transform.scale(player, (150, 100))
present = pygame.image.load('images/podarok.png')
bg2 = pygame.image.load('images/stop-bg.png')
present = pygame.transform.scale(present, (70, 70))
bg2 = pygame.transform.scale(bg2, (width, height))


presents = []

while run:
    if play:
        gameTimer += 1
        gametime = gameTimer / 120
        x += dx
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    dx = -6
                if event.key == pygame.K_RIGHT:
                    dx = 6
        if x <= 0 or x >= width-100:
            dx = -dx

        def spawnPresent():
            presents.append({
                'x': random.randint(100, width-100),
                'y': -100,
                'dx': random.randint(-5, 5),
                'dy': random.randint(-5, -1)
            })


        if gameTimer % 30 == 0:
            spawnPresent()

        for i in presents:
            i['x'] -= i['dx']
            i['y'] -= i['dy']
            if i['x'] <= 0 or i['x'] >= width - 70:
                i['dx'] = - i['dx']

            if (x + 140 >= i['x']) and (x <= i['x'] + 60) and (y + 90 >= i['y']) and (y <= i['y'] + 60):
                del presents[presents.index(i)]
                score += 1
        screen.blit(bgimg, (0, 0))
        screen.blit(player, (x, y))
        sctext = scfont.render(str(score), True, (THECOLORS['red']))
        timer = scfont.render(str(gametime), True, (THECOLORS['red']))
        screen.blit(sctext, (60, 10))
        screen.blit(timer, (width - 60, height-80))
        for i in presents:
            screen.blit(present, (i['x'], i['y']))
        pygame.display.flip()
        if gametime >= 40:
            play = False
    else:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_p:
                    score = 0
                    gameTimer = 0
                    timer = 0
                    play = True
                if event.key == pygame.K_q:
                    run = False
        screen.blit(bg2, (0, 0))
        screen.blit(tfont.render("Нажмите клавишу 'p' что-бы продолжить или 'q' что-бы выйти", True, (THECOLORS['black'])), (20, height-100))
        if score < 70:
            screen.blit(scfont.render(f"Сегодня вы не спасли рождество, ваш счёт: {score} < 70", True, (THECOLORS['red'])), (100, height/2))
        else:
            screen.blit(scfont.render(f"Сегодня вы спасли рождество, ваш счёт: {score} > 70", True, (THECOLORS['red'])), (100, height / 2))
        pygame.display.flip()
    FPS.tick(120)
