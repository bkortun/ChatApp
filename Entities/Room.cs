﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
	public class Room
	{
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string HostId { get; set; }
    }
}
