using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BP = Blackjack.Program;

namespace blackjack_windform
{
    public partial class PairBetting : Form
    {
        public PairBetting()
        {
            InitializeComponent();
        }

        private void PairBetting_Load(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            BP.pair_bet = int.Parse(textBox1.Text); // overflow 처리 필요 ? 
            this.Close();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
