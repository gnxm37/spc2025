# 튜플
# 리스트는 [], 튜플은 (), 딕셔너리 {}

my_tuple = (1,2,3,4,5)
print(my_tuple)
print(my_tuple[0])
print(my_tuple[-1])

# 모든 기능이 다 리스트와 동일함, 단 수정불가

# 튜플 언패킹(unpacking): 요소를 분할해서 가져오는 것..
a,b,c,d,e = my_tuple
print(a)
print(b)
print(c)
print(d)
print(e)

def add(a, b):
    return a+b

print("합산은",add(a, b))

def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

stats = get_stats([1,2,3,4,5])
print(stats)