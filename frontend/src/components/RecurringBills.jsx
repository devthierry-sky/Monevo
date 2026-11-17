function RecurringBills ({bills, currencyFormatter}) {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return (
        <section className="recurring-bills">
            <h2>Contas recorrentes</h2>

            <div className="bills-list">
                {bills.map((bill) => {
                    const vencimento = new Date(`${bill.dueDate}T00:00:00`)

                    const status = bill.status === "paid"
                        ? "paid"
                        : vencimento < hoje
                            ? "overdue"
                            : "pending"
                    return (
                        <div key={bill.id}>
                            <div className="bill-details">
                                <p>{bill.description}</p>
                                <span>
                                    Vencimento: {new Date(`${bill.dueDate}T00:00:00`).toLocaleDateString("pt-BR")}
                                </span>
                                <span className={`bill-status ${status}`}>
                                    {status === "paid"
                                        ? "Pago"
                                        : status === "overdue"
                                            ? "Atrasado"
                                            : "Pendente"}
                                </span>
                            </div>
                            
                            <p>{currencyFormatter.format(bill.amount)}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default RecurringBills