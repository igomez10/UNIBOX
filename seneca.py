from selenium import webdriver
import os
import time
def connect():
    browser = webdriver.Chrome('chromedriverlinux')
    url = "http://wlan.uniandes.edu.co"
    browser.get(url)
    time.sleep(1)
    usuario = browser.find_element_by_name('username')
#     change it to your username
    usuario.send_keys('i.gomez10')
# store your password as an env variable called CONTRASENA in your console before running it: CONTRASENA="somePassword123"
    lacontrasena = os.environ.get('CONTRASENA')

    contrasena = browser.find_element_by_name('password')
    contrasena.send_keys( lacontrasena )

    btnSubmit = browser.find_element_by_name("Submit")
    btnSubmit.click()

    # browser.submit()



connect()
