---
path: /github/cs6035-crypto-proj
---
# Intro to Cryptography
*Project for CS 4235/6035 - Introduction to Information Security*

## Helper Functions
```python
def extended_gcd(a, b):
    if a == 0:
        return (b, 0, 1)
    g, x, y = extended_gcd(b % a, a)
    return (g, y - x * (b // a), x)

def find_modulo_inverse(a, m):
    _, inv, _ = self.extended_gcd(a, m)
    return ((inv % m) + m) % m

def find_cubic_root(n):
    lower, upper = 0, n
    cube = 0
    while upper - lower > 1:
        mid = (lower + upper) // 2
        cube = mid ** 3
        if cube == n:
            return mid
        elif n < cube:
            upper = mid
        else:
            lower = mid+1
    if upper == lower:
        raise Exception('Cube root not found!')
    else:
        return lower
```      
## Task 1: RSA decryption              
```python
def decrypt_message(N, e, d, c):
    m = hex(pow(c, d, N))
    return m
```
## Task 2: Bruce-force password cracking
```python
def crack_password_hash(password_hash, weak_password_list):
    for password in weak_password_list:
        for salt in weak_password_list:
                hashed_password = hashlib.sha256(password.encode() + salt.encode()).hexdigest()
                if hashed_password == password_hash:
                return password, salt
```

## Task 3: Bruce-force private key cracking
```python
def get_factors(n):
    for p in range(math.ceil(n**0.5), 1, -1):
        if n % p == 0:
            return p, n // p

def get_private_key_from_p_q_e(p, q, e):
    phi = (p - 1) * (q - 1)
    return find_modulo_inverse(e, phi)
```

## Task 4: Derive private key from two public keys
```python
def get_private_key_from_n1_n2_e(n1, n2, e):
    p, _, _ = extended_gcd(n1, n2) 
    q = n1 // p
    phi = (p - 1) * (q - 1)
    _, d, _ = extended_gcd(e, phi)
    return ((d % phi) + phi) % phi
```

## Task 5: Recover message using Chinese remainder theorem
```python
def recover_msg(N1, N2, N3, C1, C2, C3):
    Y1 = N2 * N3
    Z1 = find_modulo_inverse(Y1, N1)
    Y2 = N1 * N3
    Z2 = find_modulo_inverse(Y2, N2)
    Y3 = N1 * N2
    Z3 = find_modulo_inverse(Y3, N3)
    C = (C1 * Y1 * Z1 + C2 * Y2 * Z2 + C3 * Y3 * Z3) % (N1 * N2 * N3)
    return find_cubic_root(C)
```
