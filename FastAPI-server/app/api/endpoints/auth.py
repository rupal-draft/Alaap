from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.models.pydantic_models import NewUser, UserInDB
from app.utils.security import hash_password, verify_password, create_access_token
from app.db.database import user_collection

router = APIRouter()

@router.post("/register")
async def register_user(user: NewUser):
    if user_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    user_in_db = UserInDB(email=user.email, hashed_password=hashed_password)
    
    user_collection.insert_one(user_in_db.model_dump())
    return {"msg": "User registered successfully"}

@router.post("/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    user = user_collection.find_one({"email": form_data.username})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email")
    
    user_in_db = UserInDB(**user)
    
    if not verify_password(form_data.password, user_in_db.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    access_token = create_access_token(data={"_id": str(user["_id"])})
    return {"msg": "User logged in successfully", "access_token": access_token, "token_type": "bearer"}