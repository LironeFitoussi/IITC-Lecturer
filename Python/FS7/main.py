# age = 25
# can_vote = False

# if age >= 18:
#     can_vote = True

# print(can_vote)

# temperature = 30

# if temperature <= 0:
#     print("Freezing")
# elif temperature <= 23:
#     print("Savir")
# else:
#     print("Hammm HASHILLLIIII") 

# person = {
#     "name": "Lirone",
#     "age": 26,
#     "is_student": False 
# }

# computer= {
#     "brand": "Apple",
#     "CPU": "M2",
#     "ram_min_gb": 32,
# }

# print(computer["brand"])
# print(computer["CPU"])

# # computer["ram_min_gb"] = computer["ram_min_gb"] * 2
# computer["ram_min_gb"] *= 2

# print(computer)

# functions



def mult_by_3(n):
    try:
        if not type(n)==int:
            raise TypeError("n must be an integer")
        return n * 3
    except TypeError as e:
        print(f"Type Error: {e}")  
        return "babi noo"
print(mult_by_3("babi"))