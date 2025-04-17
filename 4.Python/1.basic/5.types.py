x = 5
y = "Hello"
z = [1,2,3]

print(type(x))
print(type(y))
print(type(z))

print("x는 숫자냐?",isinstance(x, int))
print("x는 문자냐?",isinstance(x, str))
print("y는 문자냐?",isinstance(y, str))

class A:
    pass

class B(A):
# B라는 객체는 A를 상속받는다.
    pass

class C:
    pass

b = B() # 객체를 실체화.. 
print(isinstance(b, A))
print(isinstance(b, B))
print(isinstance(b, C))

a = A()
print(isinstance(a, A))
print(isinstance(a, B))
print(isinstance(a, C))

