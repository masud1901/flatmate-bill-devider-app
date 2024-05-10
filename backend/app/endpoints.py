from fastapi import APIRouter
from pydantic import BaseModel, PositiveInt, PositiveFloat
from typing import List

router = APIRouter()


class FlatmateBase(BaseModel):
    name: str
    days_in_house: PositiveInt


class FlatmatePydantic(FlatmateBase):
    payment: PositiveFloat = 0.0


class BillBase(BaseModel):
    amount: PositiveFloat
    month: PositiveInt
    year: PositiveInt
    flatmates: List[FlatmateBase]

    @property
    def total_days(self):
        return sum(fm.days_in_house for fm in self.flatmates)

    def calculate_payments(self):
        flatmates_with_payments = []

        for flatmate in self.flatmates:
            weight = flatmate.days_in_house / self.total_days
            payment = self.amount * weight / len(self.flatmates)
            flatmates_with_payments.append(
                FlatmatePydantic(
                    name=flatmate.name,
                    days_in_house=flatmate.days_in_house,
                    payment=payment,
                )
            )

        return flatmates_with_payments


@router.post("/bills/", response_model=List[FlatmatePydantic])
def create_bill(bill: BillBase):
    total_days = sum(fm.days_in_house for fm in bill.flatmates)
    flatmates_with_payments = []

    for flatmate in bill.flatmates:
        weight = flatmate.days_in_house / total_days
        payment = bill.amount * weight / len(bill.flatmates)
        flatmates_with_payments.append(
            FlatmatePydantic(
                name=flatmate.name,
                days_in_house=flatmate.days_in_house,
                payment=payment,
            )
        )

    return flatmates_with_payments
