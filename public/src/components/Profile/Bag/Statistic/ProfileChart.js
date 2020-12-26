import Chart from '../../../MainPage/Rate/OpenedRate/Chart';

export default class ProfileChart extends Chart {
    drawTransactions() {
        const { transactions } = this.props;

        this.context.strokeStyle = 'rgba(0, 0, 0, 0.3)';

        transactions.forEach(transaction => {
            const x = this.padding + (transaction.updated_at.seconds * 1000 - this.xMin) * this.xFactor;

            if (x < this.lengthXAxis()) {
                this.drawVerticalLine(x);
            }
        });
    }

    drawVerticalLine(x) {
        this.context.beginPath();
        this.context.moveTo(x, this.padding);
        this.context.lineTo(x, this.node.height - this.padding);
        this.context.stroke();
    }

    draw() {
        super.draw();
        this.drawTransactions();
    }
}
