with open('example.txt', 'w', encoding='UTF-8') as file:
    file.write("Hello, World!\n")
    file.write("여기에 기록중\n")
    file.write("=============")

print("파일을 다 썼음")

# 파일 읽기 
with open("example.txt", 'r', encoding='UTF-8') as file:
    for line in file:
        print(line, end="")

print('파일 읽었음')