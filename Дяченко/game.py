# -*- coding: utf-8 -*-
"""
Created on Wed Oct 27 16:59:14 2021

@author: User 
"""
from tkinter import *
import time
import random

class Game:
    def __init__(self):
        self.tk = Tk()
        self.tk.title('mega game')
        self.tk.resizable(0,0)
        self.canvas = Canvas(self.tk,width = 500,height = 500)
        self.canvas.pack()
        self.tk.update()
        self.canvas_height = 500
        self.canvas_width =  500
        self.bg = PhotoImage(file = 'background.gif')
        w = self.bg.width()
        h = self.bg.height()
        for x in range(0,1):
            for y in range(0,1):
                self.canvas.create_image(w*x, h*y, image = self.bg, anchor = 'nw')
        self.sprites = []
        self.run = True
    
    def mainloop(self):
        while True:
            if self.run==True:
                for sprite in self.sprites:
                    sprite.move()
            self.tk.update_idletasks()
            self.tk.update()
            time.sleep(0.01)
            
class Coords:
    def __init__(self,x1=0,y1=0,x2=0,y2=0):
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
        
def with_x(c1,c2):
    if c1.x1>c2.x1 and c1.x1<c2.x2:
        return True
    elif c1.x2>c2.x2 and c1.x2<c2.x2:
        return True
    elif c2.x1>c1.x1 and c2.x1<c1.x2:
        return True
    elif c2.x2>c1.x1 and c2.x2<c1.x2:
        return True
    else: 
        return False
    
def with_y (c1,c2):
    if c1.y1>c2.y1 and c1.y1<c2.y2:
        return True
    elif c1.y2>c2.y2 and c1.y2<c2.y2:
        return True
    elif c2.y1>c1.y1 and c2.y1<c1.y2:
        return True
    elif c2.y2>c1.y1 and c2.y2<c1.y2:
        return True
    else: 
        return False


def collide_right(c1,c2):
    if with_y (c1,c2):
        if c1.x2>=c2.x1 and c1.x2<=c2.x2:
            return True
    return False
    
def collide_left(c1,c2):
    if with_y(c1,c2):
        if c1.x1>=c2.x1 and c1.x1<=c2.x2:
            return True
    return False
        

    
def collide_top(c1,c2):
    if  with_x(c1,c2):
        if c1.y1<=c2.y2 and c1.y1>=c2.y1:
            return True
    return False
   
def collide_bottom(y,c1,c2):
    if with_x(c1,c2):
        y_calc = c1.y2+y
        if y_calc>=c2.y1 and y_calc<=c2.y2:
            return True
    return False   

class Sprite:
    def __init__(self,game):
        self.game = game
        self.endgame = False
        self.coordinates = None
    def move(self):
        pass
    def coords(self):
        return self.coordinates
    

class PlatformSprite(Sprite):
    def __init__(self, game, photo,x,y,width,height):
        Sprite.__init__(self, game)
        self.photo = photo
        self.image = game.canvas.create_image(x,y, image = self.photo, anchor = 'nw')
        self.coordinates = Coords(x,y, x+width,y+height)
        
class StickFigureSprite(Sprite):
    def __init__(self, game):
        Sprite.__init__(self, game)
        self.images_left = [
            PhotoImage(file = 'snowman-L1.gif'),
            PhotoImage(file = 'snowman-L2.gif')
            ]
        self.images_right = [
            PhotoImage(file = 'snowman-R1.gif'),
            PhotoImage(file = 'snowman-R2.gif')
            ]
        self.image = game.canvas.create_image(0,420,image = self.images_left[0],anchor = 'nw')
        self.x = -2
        self.y = 0
        self.current_image = 0
        self.current_image_add = 1
        self.jump_count = 0
        self.last_time = time.time()
        self.coordinates = Coords()
        game.canvas.bind_all('<KeyPress-Right>', self.turn_right)
        game.canvas.bind_all('<KeyPress-Left>', self.turn_left)
        game.canvas.bind_all('<space>', self.jump)
    
    def turn_right(self,event):
        self.x = 2
            
    def turn_left(self,event):
        self.x = -2
            
    def jump(self,event):
        if self.y==0:
            self.y = -4
            self.jump_count = 0
        
    
    def animate(self):
        if self.x != 0 and self.y == 0:
            if time.time()-self.last_time>0.1:
                self.last_time = time.time()
                self.current_image+=self.current_image_add
                if self.current_image>=1:
                    self.current_image_add = -1
                if self.current_image<=0:
                    self.current_image_add = 1
        if self.x<0:
            if self.y!=0:
                self.game.canvas.itemconfig(self.image,image = self.images_left[1])
            else:
                self.game.canvas.itemconfig(self.image,image = self.images_left[self.current_image])
        elif self.x>0:
            if self.y!=0:
                self.game.canvas.itemconfig(self.image,image = self.images_right[1])
            else:
                self.game.canvas.itemconfig(self.image,image = self.images_right[self.current_image])
                
    def coords(self):
        xy = self.game.canvas.coords(self.image)
        self.coordinates.x1 = xy[0]
        self.coordinates.y1 = xy[1]
        self.coordinates.x2 = xy[0]+27
        self.coordinates.y2 = xy[1]+30
        return self.coordinates
        
    def move(self):
        self.animate()
        if self.y<0:
            self.jump_count+=1
            if self.jump_count>20:
                self.y = 4
        if self.y>0:
            self.jump_count-=1
        c = self.coords()
        left = True
        right = True
        top = True
        bottom = True
        fall = True
        
        if self.y > 0 and c.y2>=self.game.canvas_height:
            self.y = 0
            bottom = False
        elif self.y<0 and c.y1<=0:
            self.y = 0
            top = False
            
        if self.x > 0 and c.x2>=self.game.canvas_width:
            self.x = 0
            right = False
        elif self.x < 0 and c.x1<=0:
            self.x = 0
            left = False
        
        for sprite in self.game.sprites:
            if sprite == self:
                continue
            sprite_c = sprite.coords()
            if top and self.y < 0 and collide_top(c,sprite_c):
                self.y = -self.y
                top = False
                
            if bottom and self.y > 0 and collide_bottom(self.y,c,sprite_c):
                self.y = sprite_c.y1 - c.y2
                if self.y < 0:
                    self.y = 0
                bottom = False
                top = False
            if bottom and fall and self.y == 0 and c.y2 < self.game.canvas_height and collide_bottom(1,c,sprite_c):
                fall = False
            if left and self.x < 0 and collide_left(c,sprite_c):
                self.x = 0
                left = False
                if sprite.endgame:
                    self.game.run = False
            if right and self.x > 0 and collide_right(c,sprite_c):
                self.x = 0
                right = False
                if sprite.endgame:
                    self.game.run = False
        if fall and bottom and self.y==0 and c.y2 < self.game.canvas_height:
            self.y = 4
        
        self.game.canvas.move(self.image,self.x,self.y)
                
            
                    
                    
                   
                
                
    
    
    
    
    
g = Game()

platform1 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 0, 480, 100, 10)
platform2 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 150,  440, 100, 10)
platform3 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 250, 400, 100, 10)
platform4 = PlatformSprite(g, PhotoImage(file = 'platform3.gif'), 300, 160, 32, 10)
platform5 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 175, 350, 100, 10)
platform6 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 30 , 300, 100, 10)
platform7 = PlatformSprite(g, PhotoImage(file = 'platform2.gif'), 180, 120, 66, 10)  
platform8 = PlatformSprite(g, PhotoImage(file = 'platform2.gif'), 65, 100, 66, 10)
platform9 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 170 ,250, 100, 10)
platform10 = PlatformSprite(g, PhotoImage(file = 'platform1.gif'), 230, 200, 100, 10)



g.sprites.append(platform1)
g.sprites.append(platform2)
g.sprites.append(platform3)
g.sprites.append(platform4)
g.sprites.append(platform5)
g.sprites.append(platform6)
g.sprites.append(platform7)
g.sprites.append(platform8)
g.sprites.append(platform9)
g.sprites.append(platform10)

sf = StickFigureSprite(g)
g.sprites.append(sf)

        

g.mainloop()