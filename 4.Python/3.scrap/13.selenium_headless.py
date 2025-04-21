# pip install selenium
# pip install webdriver_manager

from selenium import webdriver
import time
import csv
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')

driver = webdriver.Chrome(options=options)

driver.get('https://www.naver.com')

search_box = driver.find_element(By.NAME, 'query')
search_box.send_keys('python programming')
search_box.submit()

time.sleep(2)

element = driver.find_elements(By.CLASS_NAME, 'info_area')
element = driver.find_elements(By.CLASS_NAME, 'item_title')

my = driver.find_elements(By.CSS_SELECTOR, 'div.info_area > a')

for ele in element:
    print(ele.text)

# driver.save_screenshot('search_results.png')
driver.quit()

# with open("naver_books.csv", mode="w", newline="" encoding="UTF-8") as file:
#     writer = csv.writer(file)
#     writer.writerow(['제목', '링크'])
#     writer.writerows(element)