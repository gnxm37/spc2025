print("- 1 -")
for x in range(5):
    print("*" * (x+1))

print("- 2 -")
for x in range(5):
    print(" " * (4-x) + "*" * (x+1))

print("- 3 -")
for j in range(5):
    print(" " * (4-j) + "*" * (j*2+1))

print("- 4 -")
for i in range(5):
    print(" " * (4-i) + "*" * (i*2+1))
for j in range(4):
    print(" " * (j+1) + "*" * (7-(2*j)))