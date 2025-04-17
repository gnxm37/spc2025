import os

# 현재 로그인한 사용자 계정출력 (윈도우, 리눅스도 가능)
print(os.getlogin())

current_dir = os.getcwd()
print(current_dir)

new_dir = "new_directory다"
# os.mkdir(new_dir)
# os.rmdir(new_dir)

# 생성 및 삭제.. 중복으로는 불가...

