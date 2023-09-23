import pygame
from pygame.locals import *
import sys
import os
import time
import random
pygame.font.init()
WIDTH, HEIGHT = 800, 580

WIN = pygame.display.set_mode((WIDTH, HEIGHT)) 
pygame.display.set_caption("ISTE_Pygame")
#add a mainmenu, that shows how to start the game, and how to quit the game with a button to start the game and a button to quit the game in pygame

RED_SPACE_SHIP = pygame.image.load(os.path.join("assets", "pixel_ship_red_small.png"))
GREEN_SPACE_SHIP = pygame.image.load(os.path.join("assets", "pixel_ship_green_small.png"))
BLUE_SPACE_SHIP = pygame.image.load(os.path.join("assets", "pixel_ship_blue_small.png"))
BOSS = pygame.image.load(os.path.join("assets", "goblin2.png"))
# Load the background image
BG = pygame.transform.scale(pygame.image.load(os.path.join("assets", "background-black.png")), (WIDTH, HEIGHT))

# ship ship
# Define the colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (128, 128, 128)
FONT = pygame.font.SysFont("comicsansms", 48)

YELLOW_SPACE_SHIP = pygame.image.load(os.path.join("assets", "vibhor_ship.png"))

# lasers
RED_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_red.png"))
GREEN_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_green.png"))
BLUE_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_blue.png"))
YELLOW_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_yellow.png"))
class Button:
    """A class to represent a button."""

# background
BG = pygame.transform.scale(pygame.image.load(os.path.join("assets", "background-black.png")), (WIDTH, HEIGHT))
def __init__(self, text, pos):
        """Initializes the button."""
        self.text = text
        self.pos = pos
        self.width = 300
        self.height = 70
        self.rect = pygame.Rect(pos[0] - self.width // 2, pos[1] - self.height // 2, self.width, self.height)

#Laser
class Laser:
    def __init__(self, x, y, img):
        self.x = x
        self.y = y
        self.img = img
        self.mask = pygame.mask.from_surface(self.img)
    def draw(self, surface):
        """Draws the button on the given surface."""
        pygame.draw.rect(surface, GRAY, self.rect)
        pygame.draw.rect(surface, BLACK, self.rect, 3)
        draw_text(self.text, BLACK, self.pos)

    def draw(self, window):
        window.blit(self.img, (self.x, self.y))
    def is_clicked(self, pos):
        """Returns True if the button is clicked at the given position."""
        return self.rect.collidepoint(pos)

    def move(self, vel):
        self.y += vel
def draw_text(text, color, pos):
    """Draws text on the screen at the given position."""
    text_surface = FONT.render(text, True, color)
    text_rect = text_surface.get_rect(center=pos)
    WIN.blit(text_surface, text_rect)
def game():

    def off_screen(self, height):
        return not(self.y <= height and self.y >= 0)
    RED_SPACE_SHIP = pygame.image.load(os.path.join("assets", "pixel_ship_red_small.png"))
    GREEN_SPACE_SHIP = pygame.image.load(os.path.join("assets", "pixel_ship_green_small.png"))
    BLUE_SPACE_SHIP = pygame.image.load(os.path.join("assets", "pixel_ship_blue_small.png"))
    BOSS = pygame.image.load(os.path.join("assets", "goblin2.png"))

    def collision(self, obj):
        return collide(self, obj)
    # ship ship

    YELLOW_SPACE_SHIP = pygame.image.load(os.path.join("assets", "vibhor_ship.png"))

    # lasers
    RED_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_red.png"))
    GREEN_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_green.png"))
    BLUE_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_blue.png"))
    YELLOW_LASER = pygame.image.load(os.path.join("assets", "pixel_laser_yellow.png"))

class Ship:
    COOLDOWN = 30
    # background

    def __init__(self, x, y, health=100):
        self.x = x
        self.y = y
        self.health = health
        self.ship_img = None
        self.laser_img = None
        self.lasers = []
        self.cool_down_counter = 0


    def draw(self, window):
        # pygame.draw.rect(window, (255,0,0), (self.x, self.y, 50,50))
        window.blit(self.ship_img, (self.x, self.y))
        for laser in self.lasers:
            laser.draw(window)

    def move_lasers(self, vel, obj):
        self.cooldown()
        for laser in self.lasers:
            laser.move(vel)
            if laser.off_screen(HEIGHT):
                self.lasers.remove(laser)
            elif laser.collision(obj):
                obj.health -= 15
                self.lasers.remove(laser)   


    def cooldown(self):
        if self.cool_down_counter >= self.COOLDOWN:
            self.cool_down_counter = 0
        elif self.cool_down_counter > 0:
            self.cool_down_counter += 1    
    #Laser
    class Laser:
        def __init__(self, x, y, img):
            self.x = x
            self.y = y
            self.img = img
            self.mask = pygame.mask.from_surface(self.img)

        def draw(self, window):
            window.blit(self.img, (self.x, self.y))

        def move(self, vel):
            self.y += vel

        def off_screen(self, height):
            return not(self.y <= height and self.y >= 0)

    def shoot(self):
        if self.cool_down_counter == 0:
            laser = Laser(self.x + 0, self.y, self.laser_img)
            self.lasers.append(laser)
            self.cool_down_counter = 1        
        def collision(self, obj):
            return collide(self, obj)

    def get_width(self):
        return self.ship_img.get_width()

    def get_height(self):
        return self.ship_img.get_height()    

    class Ship:
        COOLDOWN = 30


        def __init__(self, x, y, health=100):
            self.x = x
            self.y = y
            self.health = health
            self.ship_img = None
            self.laser_img = None
            self.lasers = []
            self.cool_down_counter = 0

class Player(Ship):
    def __init__(self, x, y, health=100 ):
        super().__init__(x, y, health)
        self.ship_img = YELLOW_SPACE_SHIP
        self.laser_img = YELLOW_LASER
        self.mask = pygame.mask.from_surface(self.ship_img)
        self.max_health = health

    def move_lasers(self, vel, objs):
        self.cooldown()
        for laser in self.lasers:
            laser.move(vel)
            if laser.off_screen(HEIGHT):
                self.lasers.remove(laser)
            else:
                for obj in objs:
                    if laser.collision(obj):
                        objs.remove(obj)     
                        self.lasers.remove(laser)
    def healthbar(self, window):
        pygame.draw.rect(window, (255,0,0), (self.x, self.y + self.ship_img.get_height() , self.ship_img.get_width(), 10))
        pygame.draw.rect(window, (0,255,0), (self.x, self.y + self.ship_img.get_height() , self.ship_img.get_width() * (self.health/self.max_health), 10))

    def draw(self, window):
        super().draw(window)
        self.healthbar(window)


class Enemy(Ship):
    COLOR_MAP = { "red":(RED_SPACE_SHIP, RED_LASER),
                  "green": (GREEN_SPACE_SHIP, GREEN_LASER),  
                  "blue" : (BLUE_SPACE_SHIP, BLUE_LASER),
                  "blue": (BOSS, GREEN_LASER)
    }

    def shoot(self):
        if self.cool_down_counter == 0:
            laser = Laser(self.x + self.ship_img.get_width()//2 -self.laser_img.get_width()//2, self.y, self.laser_img)
            self.lasers.append(laser)
            self.cool_down_counter = 1

    def __init__(self, x, y, color, health = 100): 
        super().__init__(x, y, health)
        self.ship_img, self.laser_img = self.COLOR_MAP[color]
        self.mask = pygame.mask.from_surface(self.ship_img)

    def move(self, vel):
        self.y += vel    

#collision
def collide(obj1, obj2):
    offset_x = obj2.x - obj1.x
    offset_y = obj2.y - obj1.y
    return obj1.mask.overlap(obj2.mask, (offset_x, offset_y)) != None


# Main loop, all movements
def main():
    run = True
    FPS = 60

    level = 1
    lives = 3
    main_font = pygame.font.SysFont("Comicsans", 10)#font name and size for display
    lost_font = pygame.font.SysFont("Comicsans", 65)
    enemies = []
    wave_length = 5
    enemy_vel = 0.65

    player_vel = 5 
    player = Player(200,250)

    laser_vel = 5

    clock = pygame.time.Clock()

    lost = False

    lost_count = 0

    def redraw_window(): #this function will keep refreshing the window i.e 30 fps
        WIN.blit(BG, (0,0)) # blit will extract the surface and diplay it on the left corner(0,0)

        # drawing text and figures
        lives_label = main_font.render(f"Lives: {lives}", 1, (255,255,255)) #f string embeds the string and will display it in the window use 1(r,g,b) colour notations
        level_label = main_font.render(f"Level: {level}", 1, (255,255,255))

        WIN.blit(lives_label, (10,10))
        WIN.blit(level_label, (10,25))

        for enemy in enemies:
            enemy.draw(WIN)

        player.draw(WIN)

        def draw(self, window):
            # pygame.draw.rect(window, (255,0,0), (self.x, self.y, 50,50))
            window.blit(self.ship_img, (self.x, self.y))
            for laser in self.lasers:
                laser.draw(window)

        def move(self, vel):
            """Moves the ship up or down by the given velocity."""
            keys = pygame.key.get_pressed()
            if keys[pygame.K_UP]:
                self.y -= vel
            elif keys[pygame.K_DOWN]:
                self.y += vel

        def move_lasers(self, vel, obj):
            self.cooldown()
            for laser in self.lasers:
                laser.move(vel)
                if laser.off_screen(HEIGHT):
                    self.lasers.remove(laser)
                elif laser.collision(obj):
                    obj.health -= 15
                    self.lasers.remove(laser)   


        def cooldown(self):
            if self.cool_down_counter >= self.COOLDOWN:
                self.cool_down_counter = 0
            elif self.cool_down_counter > 0:
                self.cool_down_counter += 1    


        def shoot(self):
            if self.cool_down_counter == 0:
                laser = Laser(self.x + 69, self.y, self.laser_img)
                self.lasers.append(laser)
                self.cool_down_counter = 1        

        def get_width(self):
            return self.ship_img.get_width()

        def get_height(self):
            return self.ship_img.get_height()    

    class Player(Ship):
        def __init__(self, x, y, health=100 ):
            super().__init__(x, y, health)
            self.ship_img = YELLOW_SPACE_SHIP
            self.laser_img = YELLOW_LASER
            self.mask = pygame.mask.from_surface(self.ship_img)
            self.max_health = health

        def move_lasers(self, vel, objs):
            self.cooldown()
            for laser in self.lasers:
                laser.move(vel)
                if laser.off_screen(HEIGHT):
                    self.lasers.remove(laser)
                else:
                    for obj in objs:
                        if laser.collision(obj):
                            objs.remove(obj)     
                            self.lasers.remove(laser)
        def healthbar(self, window):
            pygame.draw.rect(window, (255,0,0), (self.x, self.y + self.ship_img.get_height() + 10, self.ship_img.get_width(), 10))
            pygame.draw.rect(window, (0,255,0), (self.x, self.y + self.ship_img.get_height() + 10, self.ship_img.get_width() * (self.health/self.max_health), 10))

        def draw(self, window):
            super().draw(window)
            self.healthbar(window)


    class Enemy(Ship):
        COLOR_MAP = { "red":(RED_SPACE_SHIP, RED_LASER),
                    "green": (GREEN_SPACE_SHIP, GREEN_LASER),  
                    "blue" : (BLUE_SPACE_SHIP, BLUE_LASER),
                    "blue": (BOSS, GREEN_LASER)
        }

        def shoot(self):
            if self.cool_down_counter == 0:
                laser = Laser(self.x - 49, self.y, self.laser_img)
                self.lasers.append(laser)
                self.cool_down_counter = 1

        def __init__(self, x, y, color, health = 100): 
            super().__init__(x, y, health)
            self.ship_img, self.laser_img = self.COLOR_MAP[color]
            self.mask = pygame.mask.from_surface(self.ship_img)

        def move(self, vel):
            self.y += vel    

    #collision
    def collide(obj1, obj2):
        offset_x = obj2.x - obj1.x
        offset_y = obj2.y - obj1.y
        return obj1.mask.overlap(obj2.mask, (offset_x, offset_y)) != None


    # Main loop, all movements
    def main():
        run = True
        FPS = 60

        level = 1
        lives = 3
        main_font = pygame.font.SysFont("Comicsans", 10)#font name and size for display
        lost_font = pygame.font.SysFont("Comicsans", 65)
        enemies = []
        wave_length = 5
        enemy_vel = 0.65

        if lost:
            lost_label = lost_font.render("YOU LOSER!!", 2, (255,255,255))
            WIN.blit(lost_label, (WIDTH/2 - lost_label.get_width()/2, 100))
        player_vel = 5 
        player = Player(200,250)

        laser_vel = 5

        clock = pygame.time.Clock()

        lost = False

        pygame.display.update()
        lost_count = 0

    while run:
        clock.tick(FPS)
        redraw_window()

        if lives <= 0 or player.health <=0:
            lost = True
            lost_count += 1

        if lost:
            if lost_count > FPS * 3:
                run = False
            else:
                continue               
        def redraw_window(): #this function will keep refreshing the window i.e 30 fps
            WIN.blit(BG, (0,0)) # blit will extract the surface and diplay it on the left corner(0,0)

            # drawing text and figures
            lives_label = main_font.render(f"Lives: {lives}", 1, (255,255,255)) #f string embeds the string and will display it in the window use 1(r,g,b) colour notations
            level_label = main_font.render(f"Level: {level}", 1, (255,255,255))

        if len(enemies) == 0:
            level += 1
            wave_length += 5
            WIN.blit(lives_label, (10,10))
            WIN.blit(level_label, (10,25))

            for i in range(wave_length):
               enemy = Enemy(random.randrange(50, WIDTH-100), random.randrange(-800, -100), random.choice(["red", "green", "blue"])) 
               enemies.append(enemy)
            for enemy in enemies:
                enemy.draw(WIN)

            player.draw(WIN)

        for event in pygame.event.get():
            if event.type==pygame.QUIT:
                run = False

        keys = pygame.key.get_pressed()
        if keys[pygame.K_a] and player.x - player_vel > 0: #left moving
            player.x -= player_vel
        if keys[pygame.K_d] and player.x + player_vel + player.get_width() <  WIDTH: #right moving
            player.x += player_vel 
        if keys[pygame.K_w] and player.y - player_vel > 0: #up going 
            player.y -= player_vel
        if keys[pygame.K_s] and player.y + player_vel + player.get_height() < HEIGHT-15: #down going
            player.y += player_vel 
        if keys[pygame.K_SPACE]:
            player.shoot()     

        for enemy in enemies[:]:
            enemy.move(enemy_vel)
            enemy.move_lasers(laser_vel, player)

            if random.randrange(0, 360) == 1: 
                enemy.shoot()

            if collide(enemy, player):
                player.health -= 10
                enemies.remove(enemy)

            if enemy.y + enemy.get_height() > HEIGHT:
                lives -= 1
                enemies.remove(enemy)

            elif enemy.y + enemy.get_height() > HEIGHT:
                lives -= 1
                enemies.remove(enemy)

        player.move_lasers(-laser_vel, enemies)
        if lost:
                lost_label = lost_font.render("YOU LOSER!!", 2, (255,255,255))
                WIN.blit(lost_label, (WIDTH/2 - lost_label.get_width()/2, 100))


        pygame.display.update()

        while run:
            clock.tick(FPS)
            redraw_window()

            if lives <= 0 or player.health <=0:
                lost = True
                lost_count += 1

            if lost:
                if lost_count > FPS * 3:
                    run = False
                else:
                    continue  
                enemies.clear()
                keys = pygame.key.get_pressed()
                if(keys[pygame.K_r]):
                    lost = False
                    lives = 3
                    level = 0
                    wave_length = 0             


            if len(enemies) == 0:
                level += 1
                wave_length += 5

                for i in range(wave_length):
                    enemy = Enemy(random.randrange(50, WIDTH-100), random.randrange(-800, -100), random.choice(["red", "green", "blue"])) 
                    enemies.append(enemy)

            for event in pygame.event.get():
                if event.type==pygame.QUIT:
                    run = False

            keys = pygame.key.get_pressed()
            if keys[pygame.K_a] and player.x - player_vel > 0: #left moving
                player.x -= player_vel
            if keys[pygame.K_d] and player.x + player_vel + player.get_width() <  WIDTH: #right moving
                player.x += player_vel 
            if keys[pygame.K_w] and player.y - player_vel > 0: #up going 
                player.y -= player_vel
            if keys[pygame.K_s] and player.y + player_vel + player.get_height() < HEIGHT: #down going
                player.y += player_vel 
            if keys[pygame.K_SPACE]:
                player.shoot()     

            for enemy in enemies[:]:
                enemy.move(enemy_vel)
                enemy.move_lasers(laser_vel, player)

                if random.randrange(0, 360) == 1: 
                    enemy.shoot()

                if collide(enemy, player):
                    player.health -= 10
                    enemies.remove(enemy)

                if enemy.y + enemy.get_height() > HEIGHT:
                    lives -= 1
                    enemies.remove(enemy)

                elif enemy.y + enemy.get_height() > HEIGHT:
                    lives -= 1
                    enemies.remove(enemy)

            player.move_lasers(-laser_vel, enemies)



        pygame.quit()        

    main()

def main_menu():
    """Displays the main menu and handles user input."""
    start_button = Button("Start Game", (WIDTH // 2, HEIGHT // 2 - 50))
    quit_button = Button("Quit Game", (WIDTH // 2, HEIGHT // 2 + 50))
    while True:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    quit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                pos = pygame.mouse.get_pos()
                if start_button.is_clicked(pos):
                    start_game()
                elif quit_button.is_clicked(pos):
                    quit_game()

        # Draw the background
        WIN.blit(BG, (0, 0))

        # Draw the menu options
        start_button.draw(WIN)
        quit_button.draw(WIN)

        # Update the display
        pygame.display.update()

def start_game():
    """Starts the game."""
    game()
    print("Starting game...")

def quit_game():
    """Quits the game."""
    print("Quitting game...")
    pygame.quit()
    quit()

main_menu()






pygame.quit()        

main()