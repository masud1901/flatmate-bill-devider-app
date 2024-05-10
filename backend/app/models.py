from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Flatmate(Base):
    __tablename__ = "flatmates"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    days_in_house = Column(Integer)
    payment = Column(Float)
    bill_id = Column(Integer, ForeignKey("bills.id"))

    bill = relationship("Bill", back_populates="flatmates")

    def __init__(self, name, days_in_house, bill):
        self.name = name
        self.days_in_house = days_in_house
        self.bill = bill


class Bill(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_key=True)
    amount = Column(Float)
    month = Column(Integer)
    year = Column(Integer)
    flatmates = relationship("Flatmate", back_populates="bill")

    def __init__(self, amount, month, year):
        self.amount = amount
        self.month = month
        self.year = year
