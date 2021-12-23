import pygame 
import random

pygame.init()
pygame.display.set_caption('snowball')
sc= pygame.display.set_mode((1000,800))
bg = pygame.image.load('bg.png')
santa= pygame.image.load('santa.png')
ico = pygame.image.load('ico.png')
snow =pygame.image.load("lk.png")
bg = pygame.transform.scale(bg, (1000,800))
santa = pygame.transform.scale(santa, (100,100))
snow = pygame.transform.scale(snow, (100,100))
pygame.display.set_icon(ico)

pygame.mixer.init()
pygame.mixer.music.load('jht.mp3')
pygame.mixer.music.play()

pygame.font.init()
fn = pygame.font.SysFont('arial', 50)

run= True
hp = 3

snows = []
timer = 0

x=400
y=400
dx=0
dy=0
clock = pygame.time.Clock()
while run:
    timer +=1 
    x+=dx
    y+=dy
    if timer % 60 == 0:
        snows.append({
            'x':random.randint(150, 650),
            'y':-200,
            'dx':random.randint(-5, 5),
            'dy':random.randint(1, 5)
            })
    
    if x>=900 or x<=0:
        dx=-dx
    if y>=700 or y<=0:
        dy=-dy
    
    for ivent in pygame.event.get():
        if ivent.type==pygame.QUIT:
            run=False
            pygame.quit()
        if ivent.type == pygame.KEYDOWN:
            if ivent.key == pygame.K_LEFT:
                dy=0
                dx=-3
            if ivent.key == pygame.K_RIGHT:
                dy=0
                dx=+3
            if ivent.key == pygame.K_UP:
                dy=-3
                dx=0    
            if ivent.key == pygame.K_DOWN:
                dy=+3
                dx=0  
    
    for i in snows:
        i['x'] += i['dx']
        i['y'] += i['dy']
        if (x+100 >= i['x']) and (x<=i['x'] +80) and (y + 100 >= i['y']) and (y <= i['y'] + 80):
            del snows[snows.index(i)]
            hp-=1
        if i['x']>=900 or i['x']<=0:
             i['dx']=-i['dx']
    sc.blit(bg, (0,0))
    if hp <= 0: 
        timer = 0
        hp = 3
    for i in snows:
        sc.blit(snow, (i['x'],i['y']))
    sc.blit(santa, (x,y))
    hjy = fn.render(str(timer/200), True, (0,0,0))
    sc.blit(hjy, (900, 700))
    pygame.display.flip()
    clock.tick(200)
    