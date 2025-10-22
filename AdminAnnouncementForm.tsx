Text file: AdminAnnouncementForm.tsx
Latest content with line numbers:
201	      });
202	    },
203	  });
204	
205	  // Show loading state while checking authentication
206	  if (loading) {
207	    return (
208	      <div className="min-h-screen flex items-center justify-center bg-gray-50">
209	        <div className="text-center">
210	          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
211	          <p className="text-muted-foreground">読み込み中...</p>
212	        </div>
213	      </div>
214	    );
215	  }
216	
217	  if (!isAuthenticated) {
218	    return (
219	      <div className="min-h-screen flex items-center justify-center bg-gray-50">
220	        <Card className="w-full max-w-md">
221	          <CardHeader>
222	            <CardTitle>ログインが必要です</CardTitle>
223	          </CardHeader>
224	          <CardContent>
225	            <Button onClick={() => setLocation("/login")} className="w-full">
226	              ログイン
227	            </Button>
228	          </CardContent>
229	        </Card>
230	      </div>
231	    );
232	  }
233	
234	  return (
235	    <div className="min-h-screen flex flex-col bg-gray-50">
236	      <Header />
237	      
238	      <div className="container py-8 max-w-4xl">
239	        {/* Header */}
240	        <div className="mb-8">
241	          <Button
242	            variant="ghost"
243	            onClick={() => setLocation("/admin/announcements")}
244	            className="mb-4"
245	          >
246	            <ArrowLeft className="w-4 h-4 mr-2" />
247	            戻る
248	          </Button>
249	          <h1 className="text-3xl font-bold mb-2">
250	            {isEdit ? "お知らせ編集" : "新規お知らせ作成"}