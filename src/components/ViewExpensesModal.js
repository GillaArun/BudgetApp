import {  Modal, Button } from "react-bootstrap"
import {Stack} from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID,useBudgets } from "../contexts/BudgetsContext"
import React from "react"
import { currencyFormatter } from "../utils"
export default function ViewExpensesModal({ budgetId, handleClose }) {
    const {getBudgetExpenses,budgets,deleteBudget,deleteExpense}=useBudgets()
    const expenses=getBudgetExpenses(budgetId)
    const budget=UNCATEGORIZED_BUDGET_ID===budgetId?{name:"Uncatagorized",id:UNCATEGORIZED_BUDGET_ID}:budgets.find(b=>b.id===budgetId)
  return (
    <Modal show={budgetId!=null} onHide={handleClose}>
      
        <Modal.Header closeButton>
          <Modal.Title>
              <Stack direction="horizontal" gap="2"><div>Expenses-{budget?.name}
              {budgetId!==UNCATEGORIZED_BUDGET_ID && (
                  <Button onClick={()=>{
                        deleteBudget(budget)
                        handleClose()
                  }}variant="outline-danger">Delete</Button>)}
              </div></Stack></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="3">
              {expenses.map(expense=>(
                <Stack direction="horizontal" gap="2" key={expense.id}>
                        <div className="me-auto fs-4">{expense.discription}</div>
                        <div className=" fs-4">{currencyFormatter.format(expense.amount)}</div>
                        <Button onClick={()=>deleteExpense(expense)}size="sm" variant="outline-danger">&times;</Button></Stack>
              ))}
          </Stack>
        </Modal.Body>
    </Modal>
  )
}