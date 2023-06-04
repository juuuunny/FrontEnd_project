using Blackjack;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using blackjack_windform.Properties;

using BP = Blackjack.Program;
using System.Security.Cryptography.X509Certificates;

namespace blackjack_windform
{
    public partial class StartPage : Form
    {
        public StartPage()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        public static Image[] cardImage;
        public static Image back_card;

        public static void PushCardImage()
        {
            Image bmp = new Bitmap(blackjack_windform.Properties.Resources.카드전체); //이미지 데이터 저장할 때 쓰는 클래스

            Image spriteSheet = bmp;

            int cardWidth = 167; //카드 1개 폭
            int cardHeight = 244; //카드 1개 높이

            int spriteSheetWidth = spriteSheet.Width; // 전체 폭
            int spriteSheetHeight = spriteSheet.Height; // 전체 높이


            int cardsPerRow = spriteSheetWidth / cardWidth; //13
            int cardsPerColumn = spriteSheetHeight / cardHeight; //5


            cardImage = new Image[cardsPerColumn * cardsPerRow];


            // 각 카드의 이미지를 배열에 저장
            for (int y = 0; y < cardsPerColumn; y++)
            {
                for (int x = 0; x < cardsPerRow; x++)
                {
                    Rectangle cropRect = new Rectangle(x * cardWidth, y * cardHeight, cardWidth, cardHeight);
                    Bitmap croppedImage = new Bitmap(cardWidth, cardHeight);
                    Graphics graphics = Graphics.FromImage(croppedImage);
                    graphics.DrawImage(spriteSheet, new Rectangle(0, 0, cardWidth, cardHeight), cropRect, GraphicsUnit.Pixel);
                    int index = y * cardsPerRow + x;
                    cardImage[index] = croppedImage;
                }
            }

            // back_card에 카드 뒷면 이미지 넣기

            Rectangle cropRect2 = new Rectangle(2 * cardWidth, 4 * cardHeight, cardWidth, cardHeight);
            Bitmap croppedImage2 = new Bitmap(cardWidth, cardHeight);
            Graphics graphics2 = Graphics.FromImage(croppedImage2);
            graphics2.DrawImage(spriteSheet, new Rectangle(0, 0, cardWidth, cardHeight), cropRect2, GraphicsUnit.Pixel);
            back_card = croppedImage2;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Visible = false;
            GamePage showForm2 = new GamePage();
            showForm2.ShowDialog();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private void pictureBox2_Click(object sender, EventArgs e)
        {

        }
    }
}