def greet(name):
    print(f"Hello, {name}!")
    # 리턴값 없음

greet("Alice")

def add(x, y):
    return x + y
    # 리턴값 있음

result = add(2,3)
print(result)

# 함수 인자의 기본값
def greet_default(name="Guest"):
    print(f"Hello, {name}!")

greet_default()
greet_default("Min")

# 함수 인자 위치 지정 가능
def example(a,b,c):
    print(f"a:{a},b:{b},c:{c}")
example(1,2,3)
example(a=1,b=2,c=3)
example(a=1,c=3,b=2)

def print_gugudan(dan):
    print(f"{dan}단")
    for i in range(1,10):
        print(f"{dan} x {i} = {dan*i}")

print_gugudan(5)

print("-" * 20)

# 미션 구구단 출력
def print_gugu():
    for i in range(2,10):
        print(f"{i}단 출력")
        for j in range(1,10):
            print(f"{i} x {j} = {i*j}")

print_gugu()

print("-" * 20)

for i in range(2, 10):
    print_gugudan(i)