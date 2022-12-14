USE [example]
GO
/****** Object:  Table [dbo].[category]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[category]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[description] [varchar](800) NULL,
	[created] [datetime2](7) NULL,
	[updated] [datetime2](7) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
 CONSTRAINT [PK__category__3213E83F831A591C] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[child]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[child]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[child](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[description] [varchar](800) NULL,
	[parent] [int] NULL,
	[created] [datetime2](7) NULL,
	[updated] [datetime2](7) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
 CONSTRAINT [PK__child__3213E83FC4447F1A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[dates]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[dates]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[dates](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[time] [datetime2](7) NULL,
	[date] [date] NULL,
	[datetime] [datetime2](7) NULL,
	[range_from] [date] NULL,
	[range_to] [date] NULL,
	[rangetime_from] [datetime2](7) NULL,
	[rangetime_to] [datetime2](7) NULL,
	[timerange_from] [datetime2](7) NULL,
	[timerange_to] [datetime2](7) NULL,
 CONSTRAINT [PK__dates__3213E83F58EB975F] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[lists]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[lists]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[lists](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[parent] [int] NULL,
	[child] [int] NULL,
	[name] [varchar](255) NULL,
 CONSTRAINT [PK__lists__3213E83F6EB2D125] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[lists_category]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[lists_category]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[lists_category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category] [int] NULL,
	[lists] [int] NULL,
 CONSTRAINT [PK__lists_ca__3213E83FD5D6F99A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[parent]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[parent]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[parent](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[description] [varchar](800) NULL,
	[created] [datetime2](7) NULL,
	[updated] [datetime2](7) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
 CONSTRAINT [PK__parent__3213E83FA21770B6] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[relation]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[relation]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[relation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[description] [varchar](800) NULL,
	[tempid] [varchar](800) NULL,
	[list] [int] NULL,
	[created] [datetime2](7) NULL,
	[updated] [datetime2](7) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
 CONSTRAINT [PK__relation__3213E83FF3E39D29] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[special]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[special]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[special](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[color] [varchar](50) NULL,
	[location] [varchar](300) NULL,
	[bit] [tinyint] NULL,
	[tags] [varchar](500) NULL,
	[html] [varchar](max) NULL,
 CONSTRAINT [PK__special__3213E83F71D0ACAF] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[texts]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[texts]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[texts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[basic] [varchar](50) NULL,
	[money] [decimal](11, 2) NULL,
	[percentage] [int] NULL,
	[normalpassword] [varchar](255) NULL,
	[passwordplus] [varchar](255) NULL,
	[textarea] [varchar](500) NULL,
	[num] [int] NULL,
	[phone] [varchar](255) NULL,
	[cellphone] [varchar](255) NULL,
	[integer] [int] NULL,
	[decimal] [decimal](18, 2) NULL,
	[hour] [varchar](5) NULL,
	[year] [int] NULL,
	[indentification] [varchar](20) NULL,
	[creditcard] [varchar](50) NULL,
 CONSTRAINT [PK__texts__3213E83F78788EE5] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[users]    Script Date: 6/27/2019 3:26:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](15) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[lastname] [varchar](50) NOT NULL,
	[email] [varchar](51) NULL,
	[password] [varchar](200) NULL,
	[confirmpassword] [varchar](250) NULL,
	[created] [datetime2](7) NOT NULL,
	[updated] [datetime2](7) NOT NULL,
	[deleted] [datetime2](7) NULL,
	[user_created] [int] NULL,
	[user_updated] [int] NULL,
	[user_deleted] [int] NULL,
	[profile] [int] NULL,
 CONSTRAINT [PK__users__3213E83F3009FCF8] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[category] ON 

INSERT [dbo].[category] ([id], [name], [description], [created], [updated], [user_created], [user_updated]) VALUES (1, N'Category 1', N'Category 1', CAST(0x0780CF7A1778D43F0B AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[category] ([id], [name], [description], [created], [updated], [user_created], [user_updated]) VALUES (2, N'Category 2', N'Category 2', CAST(0x07804DDA5778D43F0B AS DateTime2), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[category] OFF
SET IDENTITY_INSERT [dbo].[child] ON 

INSERT [dbo].[child] ([id], [name], [description], [parent], [created], [updated], [user_created], [user_updated]) VALUES (1, N'Child 1', N'Child 1', 1, CAST(0x078037042178D43F0B AS DateTime2), NULL, NULL, NULL)
INSERT [dbo].[child] ([id], [name], [description], [parent], [created], [updated], [user_created], [user_updated]) VALUES (2, N'Child 2', N'Child 2', 1, CAST(0x078018FA2678D43F0B AS DateTime2), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[child] OFF
SET IDENTITY_INSERT [dbo].[dates] ON 

INSERT [dbo].[dates] ([id], [time], [date], [datetime], [range_from], [range_to], [rangetime_from], [rangetime_to], [timerange_from], [timerange_to]) VALUES (1, CAST(0x070010F29477D43F0B AS DateTime2), CAST(0xD43F0B00 AS Date), CAST(0x070010F29477D43F0B AS DateTime2), CAST(0xD43F0B00 AS Date), CAST(0xE13F0B00 AS Date), CAST(0x070010F29477D43F0B AS DateTime2), CAST(0x070010F29477E83F0B AS DateTime2), CAST(0x070010F29477D43F0B AS DateTime2), CAST(0x070010F29477D43F0B AS DateTime2))
INSERT [dbo].[dates] ([id], [time], [date], [datetime], [range_from], [range_to], [rangetime_from], [rangetime_to], [timerange_from], [timerange_to]) VALUES (2, CAST(0x070010F29477D43F0B AS DateTime2), CAST(0xD43F0B00 AS Date), CAST(0x070010F29477D43F0B AS DateTime2), CAST(0xD43F0B00 AS Date), CAST(0xDB3F0B00 AS Date), CAST(0x070010F29477C63F0B AS DateTime2), CAST(0x070010F29477F13F0B AS DateTime2), CAST(0x070010F29477D43F0B AS DateTime2), CAST(0x070010F29477D43F0B AS DateTime2))
INSERT [dbo].[dates] ([id], [time], [date], [datetime], [range_from], [range_to], [rangetime_from], [rangetime_to], [timerange_from], [timerange_to]) VALUES (3, CAST(0x07002E2BC07CD43F0B AS DateTime2), CAST(0xD43F0B00 AS Date), CAST(0x07002E2BC07CC63F0B AS DateTime2), CAST(0xC63F0B00 AS Date), CAST(0xEA3F0B00 AS Date), CAST(0x07002E2BC07CBE3F0B AS DateTime2), CAST(0x07002E2BC07CE93F0B AS DateTime2), CAST(0x07002E2BC07CD43F0B AS DateTime2), CAST(0x07002E2BC07CD43F0B AS DateTime2))
SET IDENTITY_INSERT [dbo].[dates] OFF
SET IDENTITY_INSERT [dbo].[lists] ON 

INSERT [dbo].[lists] ([id], [parent], [child], [name]) VALUES (1, 1, 1, N'List 1')
SET IDENTITY_INSERT [dbo].[lists] OFF
SET IDENTITY_INSERT [dbo].[lists_category] ON 

INSERT [dbo].[lists_category] ([id], [category], [lists]) VALUES (1, 1, 1)
INSERT [dbo].[lists_category] ([id], [category], [lists]) VALUES (2, 2, 1)
SET IDENTITY_INSERT [dbo].[lists_category] OFF
SET IDENTITY_INSERT [dbo].[parent] ON 

INSERT [dbo].[parent] ([id], [name], [description], [created], [updated], [user_created], [user_updated]) VALUES (1, N'Parent 1', N'Parent 1', CAST(0x0700A16B2078D43F0B AS DateTime2), NULL, 1, NULL)
SET IDENTITY_INSERT [dbo].[parent] OFF
SET IDENTITY_INSERT [dbo].[relation] ON 

INSERT [dbo].[relation] ([id], [name], [description], [tempid], [list], [created], [updated], [user_created], [user_updated]) VALUES (1, N'Relation 1', N'Relation 1', NULL, 1, CAST(0x0700F2995F78D43F0B AS DateTime2), NULL, 1, NULL)
SET IDENTITY_INSERT [dbo].[relation] OFF
SET IDENTITY_INSERT [dbo].[special] ON 

INSERT [dbo].[special] ([id], [color], [location], [bit], [tags], [html]) VALUES (1, N'rgb(224, 102, 102)', N'18.483060805024085;-69.92166957672117', 1, N'hello,world,other,more', N'<p><b>Test</b></p><p><span style="background-color: rgb(255, 255, 0);"><b>Test</b></span></p><ul><li><span style="background-color: rgb(255, 255, 0);"><b>1</b></span></li><li><span style="background-color: rgb(255, 255, 0);"><b>2</b></span></li><li><span style="background-color: rgb(255, 255, 0);"><b>3<br></b></span><b><br></b><br></li></ul>')
INSERT [dbo].[special] ([id], [color], [location], [bit], [tags], [html]) VALUES (2, N'rgb(241, 194, 50)', N'18.483060805024085;-69.92166957672117', 1, N'hello,world,other,more', N'<ul><li>1</li><li>2</li><li>3</li><li>4<br></li></ul>')
SET IDENTITY_INSERT [dbo].[special] OFF
SET IDENTITY_INSERT [dbo].[texts] ON 

INSERT [dbo].[texts] ([id], [basic], [money], [percentage], [normalpassword], [passwordplus], [textarea], [num], [phone], [cellphone], [integer], [decimal], [hour], [year], [indentification], [creditcard]) VALUES (1, N'Text 1', CAST(2000.00 AS Decimal(11, 2)), 50, N'5a884bcb8db9e6aa7189a7a0abe05fd8', N'5a884bcb8db9e6aa7189a7a0abe05fd8', N'123123', 1, N'(800) 980-9999', N'(809) 809-8099', 300, CAST(2.53 AS Decimal(18, 2)), N'12:12', 2019, N'001-1868331-5', N'3265-9946-1259-5461')
INSERT [dbo].[texts] ([id], [basic], [money], [percentage], [normalpassword], [passwordplus], [textarea], [num], [phone], [cellphone], [integer], [decimal], [hour], [year], [indentification], [creditcard]) VALUES (2, N'Text 2', CAST(321691.60 AS Decimal(11, 2)), 20, N'5a884bcb8db9e6aa7189a7a0abe05fd8', N'5a884bcb8db9e6aa7189a7a0abe05fd8', N'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not onl', 2, N'(809) 809-8090', N'(809) 090-8923', 43, CAST(326.20 AS Decimal(18, 2)), N'12:12', 2019, N'265-9108551-4', N'2584-0649-4194-3066')
SET IDENTITY_INSERT [dbo].[texts] OFF
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [username], [name], [lastname], [email], [password], [confirmpassword], [created], [updated], [deleted], [user_created], [user_updated], [user_deleted], [profile]) VALUES (1, N'admin', N'Adminis', N'Trator', N'admin@dragon.com', N'9ccc9c1af553d8dfeb5a2da859f60292', N'9ccc9c1af553d8dfeb5a2da859f60292', CAST(0x0700371BF7B05C3F0B AS DateTime2), CAST(0x0700371BF7B05C3F0B AS DateTime2), NULL, 3, NULL, NULL, 1)
INSERT [dbo].[users] ([id], [username], [name], [lastname], [email], [password], [confirmpassword], [created], [updated], [deleted], [user_created], [user_updated], [user_deleted], [profile]) VALUES (2, N'agent', N'Agent', N'Agent', N'agent@dragon.com', N'9ccc9c1af553d8dfeb5a2da859f60292', N'9ccc9c1af553d8dfeb5a2da859f60292', CAST(0x0780D1ABF7A0CD3F0B AS DateTime2), CAST(0x0780D1ABF7A0CD3F0B AS DateTime2), NULL, 1, 1, NULL, 2)
INSERT [dbo].[users] ([id], [username], [name], [lastname], [email], [password], [confirmpassword], [created], [updated], [deleted], [user_created], [user_updated], [user_deleted], [profile]) VALUES (3, N'client', N'Client', N'client', N'client@dragon.com', N'9ccc9c1af553d8dfeb5a2da859f60292', N'9ccc9c1af553d8dfeb5a2da859f60292', CAST(0x07806E1532A1CD3F0B AS DateTime2), CAST(0x07806E1532A1CD3F0B AS DateTime2), NULL, 1, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[users] OFF
