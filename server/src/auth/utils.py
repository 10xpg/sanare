from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hash:
    def bcrypt(plain_password):
        return pwd_context.hash(plain_password)

    def verify(plain_password, hash_password):
        return pwd_context.verify(plain_password, hash_password)
