import os
import pygame
import random
import sys
 
x_1 = 800
y_1 = 250
x_2 = 1200
y_2 = 410
x_3 = 1500
y_3 = 400
score=0
life=20
 
FPS = 60
WIDTH = 950 
HEIGHT = 650
 
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (53, 252, 245)
YELLOW = (255, 255, 0)
SIZE = [900, 650]
 
win=False
 
pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Возвращение санты с отпуска (´｡• ᵕ •｡) ")
clock = pygame.time.Clock()
 
img_dir=os.path.join(os.path.dirname(__file__),"images")
background=pygame.image.load(os.path.join(img_dir,"bg.bmp")).convert()
background_rect=background.get_rect()
 
make_jump=False
jumpCount=10

 
clock2 = pygame.time.Clock()
def load_image(name):
    image = pygame.image.load(name)
    return image
 
class Santa(pygame.sprite.Sprite):
    def __init__(self):
        super(Santa, self).__init__()
        self.images = []
        self.images.append(load_image('images/santa0_.png'))
        self.images.append(load_image('images/santa1_.png'))
        self.images.append(load_image('images/santa2_.png'))
        self.images.append(load_image('images/santa3_.png'))
 
        self.index = 1
        self.image = self.images[self.index]
        self.rect = pygame.Rect(5, 5, 64, 64)
        self.moving_left=False
        self.moving_right=False
        self.moving_top=True
        self.moving_bottom=True
        self.rect.x = 250
        self.rect.y = 350
        self.isJump = False
        self.jumpCount = 10
 
 
    def update(self):
 
        self.index += 1
        if self.index >= len(self.images):
            self.index = 0
        self.image = self.images[self.index]
        clock.tick(10)
        global jumpCount,x_1,x_2,x_3,y_1,y_2,y_3,life,score
        if jumpCount >= -10:
            neg = 1
            if jumpCount < 0:
                neg = -1
            self.rect.y -= (jumpCount ** 2) * 0.1 * neg
            jumpCount -= 10
        else:
            jumpCount = 10
 
        if self.isJump:
            if self.jumpCount >= -10:
                self.isJump = True
                neg = 2
                if self.jumpCount < 0:
                    neg = -2
                self.rect.y -= (self.jumpCount ** 2) * 0.5 * neg
                self.jumpCount -= 2
            else:
                self.isJump = False
                self.jumpCount = 10
            
        w2 = 10; h2 = 10
        if (self.rect.x < (x_1 + w2) and (self.rect.x + self.rect.w) > x_1 and self.rect.y < (y_1 + h2) and (self.rect.h + self.rect.y) > y_1):  
           score+=1 
           x_1 = 1000
        if (self.rect.x < (x_2 + w2) and (self.rect.x + self.rect.w) > x_2 and self.rect.y < (y_2 + h2) and (self.rect.h + self.rect.y) > y_2):  
            life-=1
            x_2=900
        if (self.rect.x < (x_3 + w2) and (self.rect.x + self.rect.w) > x_3 and self.rect.y < (y_3 + h2) and (self.rect.h + self.rect.y) > y_3):  
            life-=1
            x_3=900
            
    
 
        if win:
            self.rect.x+=10
 
class Snow1:
    def __init__(self, image):
        self.image = pygame.image.load(image)
        self.rect = pygame.Rect(10, 10, 10, 10)
 
    def Play(self, screen, x_1, y_1):
        self.screen = screen
        self.screen.blit(self.image, [x_1, y_1])
 
class Snow2:
    def __init__(self, image):
        self.image = pygame.image.load(image)
        self.rect = pygame.Rect(5, 5, 5, 5)
 
    def Play(self, screen, x_1, y_1):
        self.screen = screen
        self.screen.blit(self.image, [x_1, y_1])
 
class Snow3:
    def __init__(self, image):
        self.image = pygame.image.load(image)
        self.rect = pygame.Rect(5, 5, 5, 5)
 
    def Play(self, screen, x_1, y_1):
        self.screen = screen
        self.screen.blit(self.image, [x_1, y_1])
 
 
my_sprite = Santa()
my_group = pygame.sprite.Group(my_sprite)
 
snow_list = []
for i in range(350):
    x = random.randrange(0, 950)
    y = random.randrange(0, 650)
    snow_list.append([x, y])
clock = pygame.time.Clock()
 
 
if __name__ == "__main__":    
 
    snow1 = Snow1('images/present.png')
    snow2 = Snow2('images/snow1_.png')
    snow3 = Snow3('images/snowman.png')
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        keys= pygame.key.get_pressed()
        if keys[pygame.K_SPACE]:
            my_sprite.isJump = True
 
        if not pygame.mixer.music.get_busy():
            pygame.mixer.music.load('main.mp3')
            pygame.mixer.music.play(-1)
        
        screen.fill(BLUE)
        screen.blit(background, background_rect)
        
        score_new=str(score)
        f1 = pygame.font.Font(None, 36)
        text1 = f1.render('Your score is '+score_new, 1, (0,0,0))
        screen.blit(text1, (20, 20)) 
        
        lifes_new=str(life)
        f2 = pygame.font.Font(None, 36)
        text2 = f2.render('Lifes '+lifes_new, 1, (0,0,0))
        screen.blit(text2, (20, 60))
        
        f3 = pygame.font.Font(None, 45)
        text3 = f3.render('You lost. Game over', 1, (0,0,0))
        f4 = pygame.font.Font(None, 45)
        text4 = f4.render('Hooray you won!', 1, (0,0,0))
        
        if life<=0 :
            screen.blit(text3, (300, 60))
            x_1=1100
            x_2=1100
            x_3=1100
            win=True
            
        if score==10:
            screen.blit(text4, (300, 60))
            x_1=1100
            x_2=1100
            x_3=1100
            win=True
            
            
        my_group.update()
        my_group.draw(screen)
        
        x_1 -= 15.7
        if x_1<=0:
            x_1=1000
 
        x_2 -= 15.7
        if x_2<=0:
            x_2=900
 
 
        x_3 -= 15.7
        if x_3<=0:
            x_3=900
 
 
 
        snow1.Play(screen, x_1, y_1)
        snow2.Play(screen, x_2, y_2)
        snow3.Play(screen, x_3, y_3)

 
        for i in range(len(snow_list)):
            pygame.draw.circle(screen, WHITE, snow_list[i], 2)
            snow_list[i][1] += 1.5
            if snow_list[i][1] > 650:
                y = random.randrange(-350, -10)
                snow_list[i][1] = y
                x = random.randrange(0, 950)
                snow_list[i][0] = x
        pygame.display.flip()
    pygame.quit()