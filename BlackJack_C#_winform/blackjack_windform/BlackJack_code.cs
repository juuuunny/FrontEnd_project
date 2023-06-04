using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using blackjack_windform;

//구상만 하였을 뿐 아직 함수 구현은 제대로 하지 않아
//코드 선언 내용이 아직 틀릴 수도 있음.
namespace Blackjack
{

    class Program
    {
        public static int pair_bet = 0;
        public static int insurance_bet = 0;

        //카드의 정보를 담고 있는 Card구조체 선언
        public struct Card
        {
            //문양은 스페이드, 다이아몬드, 하트, 클로버가 있다.
            public char shape;
            // 1 to 13
            public int number;
            //숫자는 j,k,q는 10으로, A는 1또는 11로 표현한다.
            //A를 어떤 수로 쓸지는 나중에 구현
            public int value;
        }

        public class Player
        {
            //플레이어의 현재 점수 score
            public int score = 0;
            //플레이어가 가지고있는 a의 갯수
            public int ace_cnt = 0;
            public int card_cnt = 0;
            public bool stay = false;
            public bool busted = false; // 플레이어가 버스트 되었는지 여부
            //플레이어가 현재 가지고 있는 카드 정보를 담은 배열 선언
            public Card[] player_cards = new Card[10];

            //카드 받는 메소드 
            public virtual void GetCard(Card card)
            {
                player_cards[card_cnt++] = card;
                if (card.value == 11)
                {
                    ace_cnt++;
                }
                UpdateScore();
                Console.WriteLine("card_info:{0} {1} {2} score: {3}", card.number, card.shape, card.value, score);
            }
            // 현재 점수 확인 메소드
            public int UpdateScore()
            {
                //점수가 21을 넘어갈 경우 가지고 있는 ace들의 밸류를 1로 바꿔야하기 때문에 카드를 받을떄마다 점수를 업데이트해줘야한다. 
                score = 0;
                for (int i = 0; i < card_cnt; i++)
                {
                    score += player_cards[i].value;
                }
                //합이 21을 넘어간다면
                if (score > 21)
                {
                    //합이 21보다 작아질때까지 a들의 밸류를 1로 바꿈
                    for (int i = 0; i < ace_cnt; i++)
                    {
                        score -= 10;
                        if (score <= 21)
                        {
                            break;
                        }
                    }
                    //합 21 넘는다면 버스트
                    if (score > 21)
                    {
                        Bust(this);
                    }
                }
                return score;
            }
        }
        public class Dealer : Player
        {
            public Dealer()
            {
                score = 0;
            }
            public override void GetCard(Card card)
            {
                //딜러의 합이 17보다 작으면 카드를 받고 그렇지 안하면 카드를 그만 받음
                if (this.UpdateScore() < 17)
                {
                    base.GetCard(card);
                }
                else
                {
                    Console.WriteLine("dealer can't get more card");
                }
            }
        }
        public class User : Player
        {
            //배팅을 해야 하기 때문에 현재 소지금 cash
            public double cash;

            public User()
            {
                score = 0;
                cash = 1000;
            }
            //첫 두장의 카드를 보고 그 판을 포기할 지 여부를 파악해주는 함수
            public void Surrender(Dealer dealer)
            {
                if (!BlackJack(dealer))  //딜러가 블랙잭이 아닐시 
                {
                    this.cash += blackjack_windform.GamePage.bet_amount / 2;
                }
            }


        }

        //A카드,2~9, Q, J, K 각각 4장씩 총 52장의 카드가 있다.
        public static Card[] all_card = new Card[52];


        //52장의 카드인 all_card 배열에 카드의 정보(해당 카드의 숫자, 모양)를 담아 주기 위한 함수
        static public void PushInformationCard(char Shape, int Number)
        {
            int Value;
            if (Number == 1)
            {
                Value = 11;
            }
            else if (Number >= 10)
            {
                Value = 10;
            }
            else
            {
                Value = Number;
            }

            Card card = new Card
            {
                shape = Shape,
                number = Number,
                value = Value
            };

            // 생성한 카드를 all_card 배열에 추가
            for (int i = 0; i < all_card.Length; i++)
            {
                if (all_card[i].number == 0)
                {
                    all_card[i] = card;
                    break;
                }
            }
        }
        //총 52장의 카드를 섞어 순서를 바꿔 줄 수 있는 함수
        static public void Shuffle()
        {
            Random rnd = new Random(); //빌트인 클래스
            for (int i = all_card.Length - 1; i >= 0; i--)
            {
                int j = rnd.Next(i + 1);
                Card temp = all_card[j];
                all_card[j] = all_card[i];
                all_card[i] = temp;
                Image temp2 = blackjack_windform.StartPage.cardImage[j];
                blackjack_windform.StartPage.cardImage[j] = blackjack_windform.StartPage.cardImage[i];
                blackjack_windform.StartPage.cardImage[i] = temp2;
            }
        }


        //플레이어의 소지금 내에서 배팅 할 수 있도록 해주는 함수, 배팅 금액을 반환해준다.
        static public int Betting(User user, int bet)
        {

            user.cash -= bet;
            return bet;
        }


        //딜러가 분배한 카드의 정보를 출력하여 볼 수 있게 해주는 함수
        static public void ShowCard(Player[] players)
        {
            Console.WriteLine("----딜러의 카드----");
            int num_card1 = players[0].player_cards.Length;
            for (int i = 0; i < num_card1; i++)
            {
                Console.Write("{0}{1} ", players[0].player_cards[i].shape, players[0].player_cards[i].number);
            }
            Console.WriteLine();
            Console.WriteLine("----딜러의 점수----");
            Console.Write(players[0].score);


            Console.WriteLine("----플레이어의 카드----");
            int num_card2 = players[1].player_cards.Length;
            for (int i = 0; i < num_card2; i++)
            {
                Console.Write("{0}{1} ", players[1].player_cards[i].shape, players[1].player_cards[i].number);
            }
            Console.WriteLine();
            Console.WriteLine("----플레이어의 점수----");
            Console.Write(players[1].score);


        }




        //플레이어가 이후 힛을 할지, 스테이를 할지 결정해주는 함수
        static public int HitOrStay(Player player, int dealing)
        {
            Console.WriteLine("----Hit 또는 Stay를 입력하여 결정해주세요.----");
            string hit_or_stay = Console.ReadLine();
            if (hit_or_stay == "Hit")
            {
                player.GetCard(all_card[dealing++]);
            }
            else if (hit_or_stay == "Stay")
            {
                player.stay = true;
            }
            return dealing;
        }


        /*처음 2장의 카드를 받은 이후 더블다운을 결정하면 1장만 힛으로
        더 받기로 하고 배팅을 2배로 한번 더 배팅할 수 있다.
        더블다운을 할 지 여부를 판단해줄 수 있는 함수*/
        static public int DoubleDown(User user, int dealing)
        {
            Console.WriteLine("----더블다운을 하시겠습니까?----");
            Console.WriteLine("----Yes or No로 입력해주세요.----");
            string double_down = Console.ReadLine();
            if (double_down == "YES")
            {
                user.GetCard(all_card[dealing++]);
                Betting(user, 1);
            }
            return dealing;
        }
        //블랙잭이 나왔는지 여부를 확인하는 함수
        static public bool BlackJack(Player player)
        {
            if (player.score == 21 && player.card_cnt == 2)  //카드를 두장 가지고 있고 합이 21이면 블랙잭
            {
                return true;
            }
            return false;
        }

        //게임 결과로 누가 승리하였는지 확인해주는 함수
        static public string ResultGame(Dealer dealer, User user)
        {
            string result;
            Console.WriteLine("{0} {1}", dealer.score, user.score);
            if (insurance_bet > 0)
                CheckInsuranceBetting(dealer, user);
            if (BlackJack(dealer) && BlackJack(user))  //딜러와 유저 둘다 블랙잭
            {
                //push(무승부) 배팅금액을 돌려받는다.
                //Console.WriteLine("Draw");
                result = "Draw";
                user.cash += blackjack_windform.GamePage.total_betamount;

            }
            else if (BlackJack(user))
            {
                //Console.WriteLine("User Win");

                result = "You Win";
                result += "\nYou won $";
                result += (blackjack_windform.GamePage.bet_amount * 2.5).ToString();


                user.cash += blackjack_windform.GamePage.total_betamount * 2.5;    //유저가 블랙잭으로 이길 경우 배팅 금액 2.5배를 딴다.
            }
            else if (BlackJack(dealer))
            {
                //Console.WriteLine("Dealer Win");
                result = "Dealer Win";
            }
            else if (dealer.busted)
            {
                //Console.WriteLine("Dealer Busted");


                result = "You Win";
                result += "\nYou won $";
                result += (blackjack_windform.GamePage.bet_amount * 2.0).ToString();
                user.cash += blackjack_windform.GamePage.bet_amount * 2.0;


            }
            else if (user.busted)
            {
                //Console.WriteLine("User Busted");
                result = "Dealer Win";
            }
            //busted 확인해야함
            else
            {
                if (dealer.score > user.score)
                {
                    //Console.WriteLine("Dealer Win");
                    result = "Dealer Win";
                }
                else if (dealer.score < user.score)
                {
                    //Console.WriteLine("User Win");

                    result = "You Win";
                    result += "\nYou won $";
                    result += (blackjack_windform.GamePage.bet_amount * 2.0).ToString();
                    user.cash += blackjack_windform.GamePage.bet_amount * 2.0;    //유저 승리 배팅금액의 두배를 돌려받는다.

                                                                                  //Console.WriteLine("user get {0}", user.bet_cash * 2.0);

                }
                else
                {
                    //push(무승부) 배팅금액을 돌려받는다.
                    //Console.WriteLine("Draw");
                    result = "Draw";
                    user.cash += blackjack_windform.GamePage.total_betamount;
                }
            }
            return result;
        }
        // 게임 한판이 끝난 뒤 배팅금액, 플레이어,딜러 카드덱을 비우고 전체카드덱 셔플
        static public void NewGame(Dealer dealer, User user)
        {

            if (user.cash > 0)          //유저가 돈이 남아있다면 새로운 게임 시작
            {
                blackjack_windform.GamePage.bet_amount = 0;
                blackjack_windform.GamePage.total_betamount = 0;

                dealer.card_cnt = 0;
                user.card_cnt = 0;
                dealer.busted = false;
                user.busted = false;
                dealer.ace_cnt = 0;
                user.ace_cnt = 0;
                user.stay = false;
                pair_bet = 0;
                insurance_bet = 0;
                Shuffle();
            }
            else             //유저가 돈이 없다면 finish the game
            {
                Environment.Exit(0);
            }
        }
        //스코어가 21이 넘어 버스트 패배하고 새 게임을 시작한다.
        static public void Bust(Player player)
        {
            Console.WriteLine("Busted");
            if (player.GetType() == typeof(Dealer))
            {
                Console.WriteLine("User Win");
            }
            else if (player.GetType() == typeof(User))
            {
                Console.WriteLine("Dealer Win");
            }
            player.busted = true;  //해당 플레이어의 상태 busted -> 게임종료 시키고 newGame호출 필요함.
        }



        /*첫 두장의 카드가 같을 경우 두 카드를 나눠서 게임하는 
         규칙인데 이 함수는 아직 할지말지 여부 미정*/
        static public void Split()
        {
        }

        //최초 받는 2장의 카드가 같은 가치를 갖는 카드일 거라 예상한다면 미리 페어 배팅 가능
        //페어 배팅할지 여부를 확인해주는 함수
        //페어 배팅을 했다면 0이 아닌 값, 안했다면 0
        static public int PairBetting(User user)
        {
            DialogResult result;

            while (true)
            {
                AskForPairBetting(user);
                if (pair_bet > user.cash)
                {
                    result = MessageBox.Show("보유하고 있는 캐시보다 많이 베팅할 수는 없습니다! 다시 베팅해주세요");
                    continue;
                }
                break;
            }

            //pair betting을 하였다면
            //if (pair_bet > 0)
            //{
             //   Console.WriteLine("You bet {0} on your pair.", pair_bet);
            //}
            return (pair_bet);
        }
        //이 돈을 받는 시점이 두 번째 카드가 공개된 시점이여서 확인과정 함수를 따로 나눔
        static public void CheckPairBetting(User user)
        {
            DialogResult result;

            //perfect pair 15배
            if ((user.player_cards[0].number == user.player_cards[1].number) && (user.player_cards[0].shape == user.player_cards[1].shape))
            {
                user.cash += pair_bet * 15;
                result = MessageBox.Show("it's perfect pair!! Congratulation!");
            }
            //color pair & mix pair 10배
            else if ((user.player_cards[0].number == user.player_cards[1].number))
            {
                user.cash += pair_bet * 10;
                result = MessageBox.Show("it's pair!! Congratulation!");
            }
            //none pair
            else
            {
                result = MessageBox.Show("It's not pair... you lose bet cash...");
                user.cash -= pair_bet;
            }
        }
        static private void AskForPairBetting(User user)
        {
            DialogResult result;
            result = MessageBox.Show("Do you want to Pair Betting?", "Pairbetting", MessageBoxButtons.YesNo);

            if (result == DialogResult.Yes)
            {
                PairBetting form = new PairBetting();
                form.ShowDialog();
            }
            else
            {
                pair_bet = 0;
            }
        }

        //상대가 블랙잭이 나올걸 대비해 베팅금액의 절반까지 인슈어런스로 지불할 수 있다.
        //인슈어런스 여부 확인 함수
        static public bool Insuarance(Dealer dealer, User user) // insurance를 베팅했으면 true, 나머지는 false
        {
            //딜러의 업카드가 Ace일 때 유저에게 묻는다.
            if (dealer.player_cards[0].value == 11)//이거 처음 받는 카드니까 ace를 11로 생각했을꺼고.. 그래서 11 값이랑 비교
            {
                return (AskForInsurance());
            }
            return (false);
        }
        static public void CheckInsuranceBetting(Dealer dealer, User user)
        {
            DialogResult result;

            //만약 딜러가 블랙잭이 맞았다면 
            if (BlackJack(dealer))
            {
                user.cash += insurance_bet * 2;
                blackjack_windform.GamePage.bet_amount = 0;
                result = MessageBox.Show("Dealer has blackjack! Insurance pays 2 to 1.");
            }
            // 블랙잭이 아니였다면 
            else
            {
                result = MessageBox.Show("Dealer does not have blackjack. You lose your insurance bet...");
                user.cash -= insurance_bet;
                //플레이어가 블랙잭이였다면 
                if (user.score == 21)
                    user.cash += blackjack_windform.GamePage.bet_amount * 1.5;

            }
        }

        static private bool AskForInsurance()
        {
            DialogResult result;
            result = MessageBox.Show("Dealer's first card is ACE. Do you want to insurance?", "InsuranceBetting", MessageBoxButtons.OKCancel);

            if (result == DialogResult.OK)
            {
                return (true);
            }
            else
            {
                insurance_bet = 0;
                return (false);
            }
        }
    }
}