using System;

namespace AnsBallBot.Database.Entities
{
    public class ChatState
    {
        public int Id { get; set; }
        public State State { get; set; }
        public DateTime LastUpdate { get; set; }
        public long ChatId { get; set; } 
    }

    public enum State
    {
        InfaState = 0,
        WhenState = 1,
        Empty = 2
    }
}
